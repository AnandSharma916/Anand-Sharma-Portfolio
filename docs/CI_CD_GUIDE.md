# CI/CD Pipeline Guide

This repository is equipped with a complete, production-ready Continuous Integration and Continuous Deployment (CI/CD) setup using **GitHub Actions**.

---

## ⚡ Workflows Overview

| Workflow | File | Triggers | Description |
| :--- | :--- | :--- | :--- |
| **CI/CD Pipeline** | [`.github/workflows/ci-cd.yml`](file:///.github/workflows/ci-cd.yml) | Push to `main`, `master`, `design/**`, PRs, Manual | Validates dependencies, tests production build, and deploys to production. |
| **GitHub Pages Deploy** | [`.github/workflows/deploy-gh-pages.yml`](file:///.github/workflows/deploy-gh-pages.yml) | Manual (`workflow_dispatch`) | Exports static site (`/out`) and deploys directly to GitHub Pages. |

---

## 🛠️ How It Works

### 1. Continuous Integration (CI)
On every commit pushed to `main`, `master`, or feature/design branches (`design/**`), or on pull requests:
1. **Repository Checkout**: Clones the latest code.
2. **Node.js Environment**: Sets up Node.js 20 with automatic npm dependency caching.
3. **Next.js Cache**: Caches `.next/cache` between runs for ultra-fast builds.
4. **Dependency Resolution**: Installs packages cleanly.
5. **Production Build**: Executes `npm run build` to guarantee zero build errors and compile all static pages.
6. **Summary Report**: Emits a step summary directly in the GitHub Actions dashboard.

### 2. Continuous Deployment (CD)
When code is merged/pushed into `main` or `master`:
- If you link your repository to **Vercel** (recommended for Next.js):
  - Add the following Repository Secrets in GitHub (`Settings > Secrets and variables > Actions`):
    - `VERCEL_TOKEN`: Generated at [vercel.com/account/tokens](https://vercel.com/account/tokens)
    - `VERCEL_ORG_ID`: Found in your Vercel project settings or `.vercel/project.json`
    - `VERCEL_PROJECT_ID`: Found in your Vercel project settings
  - The workflow will automatically prebuild and deploy live to production and output the live URL!
- If the secrets are not yet configured, the workflow gracefully completes the CI check and provides setup guidance without failing.

---

## 🚀 Setting Up Git Remote & Pushing to GitHub

If you haven't pushed this local repository to GitHub yet:

```bash
# 1. Add your GitHub repository remote URL
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git

# 2. Stage and commit your changes
git add .
git commit -m "feat: setup production CI/CD pipeline and Next.js configuration"

# 3. Rename branch to main if needed and push
git branch -M main
git push -u origin main
```

Once pushed, navigate to the **Actions** tab on your GitHub repository to see the CI/CD pipeline run in real time!
