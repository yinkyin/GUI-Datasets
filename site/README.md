# GUI Datasets Hub website

This directory contains the companion website for the `GUI-Datasets` repository.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

The GitHub Pages workflow builds this directory and deploys `site/dist/`.

## GitHub Pages base path

The repository is published as a project page at:

```text
https://yinkyin.github.io/GUI-Datasets/
```

So `vite.config.ts` sets the production base path to `/GUI-Datasets/`. If the repository name changes, update this value.

## Source of truth

Dataset records currently live in:

```text
site/src/data/datasets.ts
```

Shared schema and curation rules live in:

```text
../docs/DATASET_SCHEMA.md
```
