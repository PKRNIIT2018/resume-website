import { GitHub } from "arctic";

const clientId = import.meta.env.GITHUB_CLIENT_ID;
const clientSecret = import.meta.env.GITHUB_CLIENT_SECRET;
const redirectURI = import.meta.env.GITHUB_REDIRECT_URI || "http://localhost:4321/login/github/callback";

if (!clientId || !clientSecret) {
    console.error("CRITICAL: GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET is missing from environment variables.");
    // We throw here to ensure we don't start with invalid config, 
    // though this might cause the module import to fail.
    throw new Error("Missing GitHub OAuth credentials");
}

export const github = new GitHub(
    clientId,
    clientSecret,
    redirectURI
);
