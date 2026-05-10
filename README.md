# Gloom Slayer

Dark side-scrolling beat-em-up. Single-file HTML5 game.

## Play

After setup: **`https://<your-username>.github.io/gloom-slayer/`**

## Setup (one time)

1. Create a new GitHub repo named `gloom-slayer`
2. Push all files from this folder to the `main` branch:
   ```bash
   git init
   git remote add origin https://github.com/<your-username>/gloom-slayer.git
   git add .
   git commit -m "initial"
   git push -u origin main
   ```
3. In your repo → **Settings → Pages → Source → GitHub Actions**
4. The workflow runs automatically on every push to `main`

## Updating the game

```bash
# After downloading the latest gloom-slayer-1.0.0.html from Claude:
git add gloom-slayer-1.0.0.html
git commit -m "update: <what changed>"
git push
```

GitHub Actions deploys in ~30 seconds. The live URL never changes.

## File structure

```
gloom-slayer-1.0.0.html   ← entire game (HTML + JS + CSS)
manifest.json              ← PWA manifest
sw.js                      ← service worker for offline play
*.mp3                      ← soundtrack files
.github/workflows/         ← auto-deploy on push
```

## Audio

The game references MP3 files by filename. Keep all `.mp3` files in the
same folder as the HTML file (and in the repo root) so the service worker
can cache them.
