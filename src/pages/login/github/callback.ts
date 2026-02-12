import { github } from "../../../utils/github";
import { createSessionCookie } from "../../../utils/auth";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_MAX_AGE } from "../../../utils/constants";
import type { APIRoute } from "astro";
import { OAuth2RequestError } from "arctic";

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const storedState = cookies.get("github_oauth_state")?.value ?? null;

    if (!code || !state || !storedState || state !== storedState) {
        return new Response(null, {
            status: 400,
        });
    }

    try {
        const tokens = await github.validateAuthorizationCode(code);
        const githubUserResponse = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
            },
        });
        const githubUser: GitHubUser = await githubUserResponse.json();

        const allowedUser = import.meta.env.ADMIN_GITHUB_USERNAME;

        if (!allowedUser || githubUser.login !== allowedUser) {
            return new Response(`Unauthorized: GitHub user '${githubUser.login}' is not allowed.`, {
                status: 403
            });
        }

        const session = await createSessionCookie();
        cookies.set(AUTH_COOKIE_NAME, session, {
            path: "/",
            secure: import.meta.env.PROD,
            httpOnly: true,
            maxAge: AUTH_COOKIE_MAX_AGE,
            sameSite: "lax",
        });

        return redirect("/admin");
    } catch (e) {
        if (e instanceof OAuth2RequestError) {
            // invalid code
            return new Response(null, {
                status: 400,
            });
        }
        return new Response(null, {
            status: 500,
        });
    }
};

interface GitHubUser {
    id: number;
    login: string;
}
