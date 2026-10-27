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
  - OFF's search (`cgi/search.pl`) is often overloaded and returns 503 (checked 2026-10-26: most calls failed). `offFetch` retries up to 9 times with growing waits, alternating ca.openfoodfacts.org and world.openfoodfacts.org (both allow CORS); 404 = not found, no retry. Successful searches are cached on the phone (`searchCache`, 40 queries, 14 days).
  - search.openfoodfacts.org (their newer search) works but does NOT send CORS headers, so the browser can't use it.
- Live barcode scanner: camera via `getUserMedia` + ZXing (`@zxing/library@0.21.3` from unpkg). Detects automatically, then looks the code up on Open Food Facts. Unknown products get entered once from the label and are saved in `P.barcodes`.
- Quick add (calories and/or macros).
- Magic link from a Claude chat: `https://nsaad18.github.io/power-tracker/#add=<base64url JSON>` with `{"d":"YYYY-MM-DD","i":[[name, serving, kcal, protein, carbs, fat, emoji, meal]]}` (d and meal optional; meal is Breakfast/Lunch/Dinner/Snacks). Always asks to confirm, with day chips defaulting to `d`, else the day on screen. Put `d` in every link, since Nader often pastes the next day.
- Picking the day: Log food has red day chips (Today, Yesterday, last week) that also move the home screen; Edit entry has the same chips to move an entry to another day. On iPhone a tapped link opens in Safari (separate storage from the home-screen app), so Nader copies it and uses Log food › Quick add › "📋 Paste from Claude".
- Food verdict: tapping a food (search result or diary entry) shows a Clean / Okay / Junk / Trash badge with up to 4 +/− reasons (`verdictHTML`, rule-based, coach voice).
- Shake & tilt the water (Settings switch, `P.motion`, off by default): deviceorientation keeps the liquid level, devicemotion shakes kick a spring (`waterStep`). iPhone needs a one-time permission from a real tap.
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
