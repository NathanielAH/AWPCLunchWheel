# AWPCLunchWheel

A simple web app that chooses a random lunch spot from `menu.txt` and remembers what was already picked for the week.

## Running locally
Open `index.html` in your browser. The wheel will read `menu.txt` and keep track of used restaurants in `localStorage`. It also records how many times each restaurant has ever been picked, which is shown below the wheel.

## GitHub Pages
This repository includes a GitHub Actions workflow to deploy the page to GitHub Pages. Once GitHub Pages is enabled for the repository ("Deploy from a branch"), every push to the `main` branch will publish the site. The page URL will look like:

```
https://<your-user>.github.io/<this-repo>/
```

Navigate to that URL to spin the wheel online.
