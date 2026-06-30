# GitHub Pages setup for GUI-Datasets

This repository is organized as **GitHub repository + companion website**:

- repository root: README, docs, issue template, classifier script, curation workflow;
- `site/`: React/Vite website source;
- `.github/workflows/deploy-pages.yml`: GitHub Actions workflow that builds `site/` and publishes `site/dist/` to GitHub Pages.

## Expected public URL

For repository `https://github.com/yinkyin/GUI-Datasets`, the default GitHub Pages URL is:

```text
https://yinkyin.github.io/GUI-Datasets/
```

`site/vite.config.ts` is already configured with:

```ts
base: command === "build" ? "/GUI-Datasets/" : "/"
```

This is required because GitHub Pages serves project pages under the repository name path.

## One-time GitHub settings

1. Open the repository on GitHub: `https://github.com/yinkyin/GUI-Datasets`.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose:
   - **Source:** GitHub Actions
4. Save if GitHub asks you to save.

After this, the workflow in `.github/workflows/deploy-pages.yml` controls deployment.

## Upload / push commands

From the local repository root:

```bash
cd GUI-Datasets

git status --short
git add README.md docs scripts site .github .gitignore package.json
git commit -m "Organize repository with companion website"
git push origin main
```

The push to `main` triggers the Pages deployment automatically.

If the remote is not configured yet:

```bash
git remote add origin https://github.com/yinkyin/GUI-Datasets.git
git push -u origin main
```

If the remote already exists, check it with:

```bash
git remote -v
```

## Local verification before push

From repository root:

```bash
npm run setup
npm run build
npm run preview
```

Equivalent direct commands:

```bash
cd site
npm install
npm run build
npm run preview
```

## Manual deployment trigger

If you want to redeploy without a new commit:

1. Open **Actions** on GitHub.
2. Select **Deploy companion website to GitHub Pages**.
3. Click **Run workflow**.
4. Choose branch `main` and run.

## What to edit next time

- Update dataset records: `site/src/data/datasets.ts`
- Update data schema or contribution rules: `docs/DATASET_SCHEMA.md`
- Update website UI: `site/src/App.tsx` and related files under `site/src/`
- Update repository landing text: `README.md`
- Update deployment: `.github/workflows/deploy-pages.yml` or `site/vite.config.ts`

## Common issues

### Website loads blank on GitHub Pages

Check that `site/vite.config.ts` contains `/GUI-Datasets/` as the build base. If the repository name changes, update the base path accordingly.

### Workflow succeeds but Pages URL is 404

Confirm **Settings → Pages → Source** is set to **GitHub Actions**. Also wait 1-2 minutes after the first successful deployment.

### Assets 404 under `/GUI-Datasets/`

Run a fresh build after changing `vite.config.ts`:

```bash
npm run build
```

Then push the changed config and source files.

### Deployment runs on the wrong branch

The workflow currently triggers on `main`:

```yaml
on:
  push:
    branches: [main]
```

If your default branch changes, update `.github/workflows/deploy-pages.yml`.
