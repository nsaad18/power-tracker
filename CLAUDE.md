# Power Tracker

Nader's personal calorie tracker. A single-page web app hosted on GitHub Pages and added to his iPhone home screen.

## What it is
- `index.html` holds everything: HTML, CSS and JavaScript in one file. No build step, no framework.
- `manifest.json` + `icons/` make it installable ("Add to Home Screen").
- `sw.js` is the service worker for offline use. **Bump `CACHE` in sw.js (v1 → v2…) whenever any app file changes**, or phones keep the old version.

## Design rules (from Nader)
- Simple, neat, user-friendly. Apple Health look. No clutter.
- Black background, red (`--red: #ff2d3d`) as the accent.
- Branding copies Nader's Power Vape store logo (`Documents\powervape-site`): lowercase "power tracker" in Sora (self-hosted in `fonts/`, OFL licence) with a glowing power symbol as the "o" — red here instead of the store's blue. App icons are the red power symbol alone; to redraw them, the generator was a no-dependency Python script (PNG via zlib).
- Never scrolls sideways. Must look right at iPhone width (~390px).
- Signature feature: tap the calorie ring to log food; logged foods float around the ring as bubbles.
  - Inside the ring, red liquid (`.liquid`, CSS var `--lvl`) rises with calories eaten, with moving waves; it sloshes when food is added and pulses when over goal.
  - Bubble size follows real calories (32–64 px). Bubbles glow orange for junk and green for clean food (`foodKind`, shares the coach's word lists); a small legend shows under the summary.

## Features
- Motivational quote card under the header (`QUOTES` array): a new one on every open, when coming back to the app after 30+ s, or on tap.
- Daily calories + protein / carbs / fat, diary by meal, day-to-day navigation (arrows or swipe on the ring), streak counter.
- Coach card under the macros (`renderCoach`): brutally honest grade A–F + up to 3 "what's wrong / how to fix" lines. Rule-based, runs on the phone (Nader chose this over a real AI API). Judges against time of day; tone is blunt with light swearing, on purpose.
- App feel: sticky blurred header, swipe a sheet down by its top bar to close, no double-tap zoom or text-select on buttons, page behind sheets doesn't scroll.
- Search: built-in Canadian food list (`FOODS` array) + "Search online" via Open Food Facts (Canada filter).
- Live barcode scanner: camera via `getUserMedia` + ZXing (`@zxing/library@0.21.3` from unpkg). Detects automatically, then looks the code up on Open Food Facts. Unknown products get entered once from the label and are saved in `P.barcodes`.
- Quick add (calories and/or macros).
- Settings: kg/lb, cm/ft-in, kcal/kJ, age/height/weight/goal, activity, weekly goal (Mifflin-St Jeor), macro presets or custom, manual calorie override, backup/restore to a JSON file.

## Data
- Saved in the phone's `localStorage` under the `powertracker.v1:` prefix: `profile` and one `day-YYYY-MM-DD` key per day.
- Nothing leaves the phone except barcode/search lookups to Open Food Facts.

## Camera note
The camera only works over **https** (GitHub Pages is fine). Opening index.html straight from the PC disables the scanner.

## Testing on the PC
Run `npx serve .` (or `python -m http.server 8000`) in this folder and open http://localhost:8000. Localhost counts as secure, so the webcam scanner works there too.

## Publishing
Push to the `main` branch of the GitHub repo; GitHub Pages redeploys in about a minute.
