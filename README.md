# AWPCLunchWheel

A simple web app that chooses a random lunch spot from `menu.txt` and remembers what was already picked for the week.

## Running locally
Due to browser security restrictions it is best to serve the files via a tiny
local web server rather than opening `index.html` directly. You can run

```bash
npx serve
# or
python3 -m http.server
```

and then browse to `http://localhost:3000` (or `http://localhost:8000` for the
Python command). The wheel reads `menu.txt` and keeps track of used restaurants
in `localStorage`. It also records how many times each restaurant has ever been
picked, which is shown below the wheel.

## GitHub Pages
This repository includes a GitHub Actions workflow to deploy the page to GitHub Pages. Once GitHub Pages is enabled for the repository ("Deploy from a branch"), every push to the `main` branch will publish the site. The page URL will look like:

```
https://<your-user>.github.io/<this-repo>/
```

Navigate to that URL to spin the wheel online.
