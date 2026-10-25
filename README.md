# Power Tracker

Simple calorie and macro tracker with a live barcode scanner. Black and red, Apple Health style.

## Put it online (one time, about 5 minutes)

**Easiest: let Claude Code do it.** Open Claude Code in this folder and say:

> Create a public GitHub repo called power-tracker from this folder, push it, and turn on GitHub Pages from the main branch. Then give me the link.

**Or by hand:**
1. Sign in at github.com and click **New repository**. Name it `power-tracker`, set it to **Public**, then click **Create**.
2. On the new repo page, click **uploading an existing file**. Drag in everything in this folder (`index.html`, `manifest.json`, `sw.js`, the `icons` folder, these notes). Click **Commit changes**.
3. Go to **Settings › Pages**. Under *Branch*, pick **main** and **/ (root)**, then click **Save**.
4. After about a minute your app is live at `https://YOUR-USERNAME.github.io/power-tracker/`.

## Add it to your iPhone
1. Open the link in **Safari**.
2. Tap **Share** › **Add to Home Screen** › **Add**.
3. Open it from the new icon. The first time you open Barcode, tap **Allow** for the camera.

## Good to know
- Your diary is saved on your phone. Use **Settings › Your data › Back up** now and then.
- Barcode and online search use Open Food Facts, a free food database. If a product isn't there, enter it once from the label and it's remembered.
