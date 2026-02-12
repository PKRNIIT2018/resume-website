import { generateState } from "arctic";
import { github } from "../../../utils/github";

import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies, redirect }) => {
    try {
        const state = generateState();
        const scopes = ["read:user", "user:email"];
        const url = await github.createAuthorizationURL(state, scopes);

        cookies.set("github_oauth_state", state, {
            path: "/",
            secure: import.meta.env.PROD,
            httpOnly: true,
            maxAge: 60 * 10,
            sameSite: "lax",
        });

        return redirect(url.toString());
    } catch (error: any) {
        console.error("GitHub Login Error:", error);
        return new Response(`GitHub Login Failed: ${error.message}`, { status: 500 });
    }
};
