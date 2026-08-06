## Deployed Link: [Check Out my Portfolio](https://devayushraj.com/)

### My Portfolio Repo

## Deploy to Vercel

This repository is a static portfolio and can be deployed to Vercel either via the Vercel CLI or by connecting the GitHub repository in the Vercel dashboard.

Quick CLI deploy (one-off / immediate):

1. Install the Vercel CLI globally:

   npm install -g vercel

2. Log in to your Vercel account:

   vercel login

3. Deploy the project (follow the interactive prompts):

   vercel --prod

Notes:

- I added `vercel.json` to the repo to instruct Vercel to serve `index.html` and route all paths to it (useful for single-page apps).
- If you prefer automated deployments, push this repo to GitHub and go to https://vercel.com/new to import the repository and enable automatic deployments on push.
- No build step is required since this is a static site. Vercel will serve the files from the repository root.

Troubleshooting:

- If assets aren't loading, confirm paths in `index.html` are relative and that `assets/` is present at the repo root.
- If you need custom headers or redirects, we can add a `vercel.json` route rule or a `static.json` depending on needs.
