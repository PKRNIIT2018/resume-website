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

    if (!code || !state || !storedState || state !== storedState) {
        const errorDetails = {
            hasCode: !!code,
            hasState: !!state,
            hasStoredState: !!storedState,
            stateMatch: state === storedState
        };
        console.error("OAuth Callback Error:", errorDetails);

        // Return detailed error for debugging
        return new Response(`Invalid request: State mismatch or missing parameters. Debug details: 
        Code: ${errorDetails.hasCode}, 
        State: ${errorDetails.hasState}, 
        Stored State: ${errorDetails.hasStoredState}, 
        Match: ${errorDetails.stateMatch}`, {
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
