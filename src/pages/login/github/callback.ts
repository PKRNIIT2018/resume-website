import { github } from "../../../utils/github";
import { createSessionCookie } from "../../../utils/auth";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_MAX_AGE } from "../../../utils/constants";
import type { APIRoute } from "astro";
import { OAuth2RequestError } from "arctic";

interface GitHubUser {
    id: number;
    login: string;
}

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const storedState = cookies.get("github_oauth_state")?.value ?? null;

    // Debug Logging
    const cookieHeader = url.searchParams.get("mock_cookie") || "not-available-in-astro-cookies-obj";

    console.log("Debug Cookie Check:", {
        hasCode: !!code,
        hasState: !!state,
        hasStoredState: !!storedState,
        storedStateValue: storedState ? storedState.substring(0, 5) + "..." : "null",
    });

    if (!code || !state || !storedState || state !== storedState) {
        console.error("OAuth Callback Error: Invalid state or code", {
            codeReceived: !!code,
            stateReceived: !!state,
            storedStateReceived: !!storedState,
            stateMatch: state === storedState,
            redirectStatus: "Possible Cookie Mismatch"
        });

        return new Response(`Invalid request: State mismatch. 
        Stored State: ${storedState ? 'Present' : 'Missing'}. 
        Received State: ${state ? 'Present' : 'Missing'}.
        Ensure you are accessing via HTTPS and Cookies are enabled.`, {
            status: 400,
        });
    }

    try {
        console.log("Validating authorization code...");
        const tokens = await github.validateAuthorizationCode(code);

        console.log("Fetching user profile...");
        const githubUserResponse = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken()}`,
                "User-Agent": "astro-resume-website"
            },
        });

        if (!githubUserResponse.ok) {
            console.error("GitHub User Fetch Error:", await githubUserResponse.text());
            throw new Error(`Failed to fetch user: ${githubUserResponse.statusText}`);
        }

        const githubUser: GitHubUser = await githubUserResponse.json();
        console.log("User fetched:", githubUser.login);

        const allowedUser = import.meta.env.ADMIN_GITHUB_USERNAME;

        if (!allowedUser) {
            console.error("CRITICAL: ADMIN_GITHUB_USERNAME is not set in environment variables.");
            return new Response("Server Configuration Error: Admin username not set", { status: 500 });
        }

        if (githubUser.login.toLowerCase() !== allowedUser.toLowerCase()) {
            console.warn(`Unauthorized access attempt by: ${githubUser.login}`);
            return new Response(`Unauthorized: GitHub user '${githubUser.login}' is not allowed.`, {
                status: 403
            });
        }

        console.log("User authorized. Creating session...");
        const session = await createSessionCookie();
        cookies.set(AUTH_COOKIE_NAME, session, {
            path: "/",
            secure: import.meta.env.PROD,
            httpOnly: true,
            maxAge: AUTH_COOKIE_MAX_AGE,
            sameSite: "lax",
        });

        return redirect("/admin");
    } catch (e: any) {
        console.error("OAuth Callback Critical Failure:", e);

        // Log environment details for debugging (redacted)
        console.error("Debug Info:", {
            redirectURI: import.meta.env.GITHUB_REDIRECT_URI,
            site: import.meta.env.SITE,
            hasClientId: !!import.meta.env.GITHUB_CLIENT_ID,
            hasClientSecret: !!import.meta.env.GITHUB_CLIENT_SECRET,
            errorType: e?.constructor?.name,
            errorMessage: e?.message
        });

        if (e instanceof OAuth2RequestError) {
            return new Response(`Invalid OAuth Request: ${e.message}`, {
                status: 400,
            });
        }
        return new Response(`Authentication Failed: ${e instanceof Error ? e.message : "Unknown Error"}`, {
            status: 500,
        });
    }
};
