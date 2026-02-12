import { GitHub } from "arctic";

const clientId = import.meta.env.GITHUB_CLIENT_ID;
const clientSecret = import.meta.env.GITHUB_CLIENT_SECRET;

// Construct the redirect URI:
// 1. Use explicit env var if set
// 2. Use SITE (production URL) + path
// 3. Fallback to localhost
const site = import.meta.env.SITE || "http://localhost:4321";
const redirectURI = import.meta.env.GITHUB_REDIRECT_URI || `${site}/login/github/callback`;

console.log("GitHub OAuth Configuration:", {
    hasClientId: !!clientId,
    hasClientSecret: !!clientSecret,
    redirectURI // Log this to help debugging
});

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
