# Kettlebell EMOM — PWA

12kg kettlebell EMOM timer. Three rotating sessions (hinge & push, core, pull),
sixty progressive workouts, no loaded knee bend anywhere.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole app |
| `manifest.webmanifest` | Name, icons, standalone display |
| `sw.js` | Service worker — caches everything for offline use |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` | Icons |

## Getting it on your phone

A PWA has to be served over HTTPS. Opening `index.html` straight from the
filesystem will run the timer, but it won't install or work offline.

**GitHub Pages** — free, about five minutes:

1. Make a new public repo, upload all the files to the root.
2. Settings → Pages → Source: `main`, folder: `/ (root)`, Save.
3. Wait a minute, then open the `https://<you>.github.io/<repo>/` URL on your phone.
4. Android Chrome: an **Install** button appears in the app, or use ⋮ → *Add to Home screen*.
   iOS Safari: Share → *Add to Home Screen* (Safari ignores the install button).

**Netlify Drop** — drag the folder onto https://app.netlify.com/drop. No account needed.

Once installed it runs fullscreen, works with no signal, and keeps the screen
awake while a workout is running.

## Progress

The app remembers the last workout you finished and opens on the next one.
That's stored on the device only — clearing site data resets it.

## Sessions

- **A · Hinge & push** — swings, suitcase carry, curl + press, push-ups, row from floor
- **B · Core & rotation** — halos, woodchoppers, Russian twists, plank pull-through, round the world
- **C · Pull emphasis** — row from floor, high pull, RDL, floor pullover, push press

Workouts rotate A → B → C → A. Five rounds for workouts 1–12, six from 13 on.
Reps scale from a light start to full volume at workout 60.
