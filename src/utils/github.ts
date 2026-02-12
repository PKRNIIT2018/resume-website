import { GitHub } from "arctic";

const redirectURI = import.meta.env.GITHUB_REDIRECT_URI || "http://localhost:4321/login/github/callback";

export const github = new GitHub(
    import.meta.env.GITHUB_CLIENT_ID,
    import.meta.env.GITHUB_CLIENT_SECRET,
    redirectURI
);
