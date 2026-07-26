# Automated Deployment Guide (CI/CD)

This handbook provides step-by-step instructions for deploying and automating your portfolio website with **GitHub** and **Vercel** under your custom production domain: **`rahullo.online`**.

---

## 1. Initial GitHub Setup

Before deploying, you must push your project to a GitHub repository:

1. **Create a new, empty repository** on [GitHub](https://github.com/new). Name it `portfolio` (keep it private or public).
2. **Link and push your local repository** to GitHub by running the following commands in your project root terminal:
   ```bash
   # Add your GitHub repository as a remote
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/portfolio.git
   
   # Rename default branch to main if not already
   git branch -M main
   
   # Push your committed changes to GitHub
   git push -u origin main
   ```

---

## 2. Connecting to Vercel

1. Log into your [Vercel Dashboard](https://vercel.com). If you don't have an account, sign up using your GitHub account.
2. Click **Add New** → **Project**.
3. Import your `portfolio` repository from the list.
4. **Environment Variables**: Expand the environment variables section and add the following keys:
   * `RESEND_API_KEY`: The API key generated from your [Resend Dashboard](https://resend.com) (used for sending contact form messages).
   * `ADMIN_TOKEN`: A custom password (e.g. `admin123` or a secure random hash) used to authenticate uploads on the `/admin/resume` dashboard.
5. Click **Deploy**. Vercel will build and launch your application at a default preview URL (e.g., `portfolio-nine.vercel.app`).

---

## 3. Configuring your Custom Domain (`rahullo.online`)

To link your purchased domain **`rahullo.online`** to your Vercel project:

1. In your Vercel Project Dashboard, navigate to **Settings** → **Domains**.
2. Click **Add**.
3. Enter your domain: `rahullo.online` and click **Add**.
4. Vercel will prompt you to select redirect options. Select **Redirect www.rahullo.online to rahullo.online** (canonical URL redirection for SEO).
5. Vercel will show that the domain configuration is pending. It will provide the required **DNS Records** you need to add to your domain registrar (e.g. Namecheap, GoDaddy, Squarespace, Cloudflare).

---

## 4. DNS Configuration Guide

Log into the dashboard of the domain registrar where you purchased `rahullo.online` (GoDaddy, Namecheap, etc.), locate the **DNS Zone Editor** / **DNS Settings** for your domain, and add/modify the following records:

### Record 1: Apex Domain (Points `rahullo.online` to Vercel)
* **Type**: `A`
* **Name / Host**: `@` (or leave empty, representing the root domain)
* **Value / IP Address**: `76.76.21.21` (Vercel's global Anycast IP)
* **TTL**: `3600` (or `Automatic` / `Default`)

### Record 2: Subdomain Redirect (Points `www.rahullo.online` to Vercel)
* **Type**: `CNAME`
* **Name / Host**: `www`
* **Value / Target**: `cname.vercel-dns.com.` (include the trailing period if required by registrar)
* **TTL**: `3600`

> [!NOTE]
> DNS propagation can take anywhere from **5 minutes to 48 hours** globally, though it usually resolves within 15 minutes. Once resolved, Vercel will automatically generate and renew Let's Encrypt SSL certificates, enforcing a secure HTTPS connection.

---

## 5. Automated CI/CD & Branch Strategy

With GitHub and Vercel connected, manual deployments are no longer needed. The deployment workflow operates on a branch-based Git model:

```
[Local VS Code Workspace]
       ↓ (git commit)
       ↓ (git push)
[GitHub Repository]
       ├─► Feature branch (feature/*) ──► Auto-deploys a Preview URL (e.g., feature-dark-mode.vercel.app)
       └─► Main branch (main) ──────────► Auto-deploys to Production (https://rahullo.online)
```

### Feature Branch Previews
* When you create a new branch locally (`git checkout -b feature/cool-update`) and push it to GitHub, Vercel detects the change and builds a isolated **Preview Deployment**.
* Creating a Pull Request (PR) on GitHub will automatically attach the preview URL in the PR comments, enabling you to test changes live in a staging environment before merging.

### Production Launches
* Merging a Pull Request into the `main` branch (or pushing directly to `main`) triggers a production build.
* Within a few minutes, Vercel updates the live site at **`https://rahullo.online`** automatically.

---

## 6. Project Rollback

If a bad change is deployed to production:
1. Go to your project page in the **Vercel Dashboard**.
2. Navigate to the **Deployments** tab.
3. Locate the previous successful deployment card.
4. Click the three dots `...` and select **Rollback**. 
5. Vercel will instantly route DNS traffic back to the chosen stable build within seconds, without triggering a rebuild.

---

## 7. Troubleshooting

* **Build Fails due to typescript or ESLint warnings**: Next.js block production builds on errors. Fix the errors locally, verify they build cleanly with `npm run build`, then commit and push.
* **Mismatched CSS imports error**: Ensure all CSS `@import` declarations precede any standard selector blocks.
* **API key connection issues**: Ensure you do not commit keys inside `.env.local` to Git. Configure them exclusively in the Vercel Settings console.
