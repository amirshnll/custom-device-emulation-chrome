# Custom Device Emulation Chrome

[![GitHub stars](https://img.shields.io/github/stars/amirshnll/custom-device-emulation-chrome?style=flat-square&logo=github&color=eab308)](https://github.com/amirshnll/custom-device-emulation-chrome/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/amirshnll/custom-device-emulation-chrome?style=flat-square&logo=github)](https://github.com/amirshnll/custom-device-emulation-chrome/forks)
[![Extension version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Famirshnll%2Fcustom-device-emulation-chrome%2Fmain%2Fplugin%2Fmanifest.json&query=%24.version&label=extension&prefix=v&color=2563eb&style=flat-square)](https://github.com/amirshnll/custom-device-emulation-chrome/blob/main/plugin/manifest.json)
[![License](https://img.shields.io/github/license/amirshnll/custom-device-emulation-chrome?style=flat-square&color=16a34a)](LICENSE)
[![Last commit](https://img.shields.io/github/last-commit/amirshnll/custom-device-emulation-chrome?style=flat-square)](https://github.com/amirshnll/custom-device-emulation-chrome/commits/main/)
[![Open issues](https://img.shields.io/github/issues/amirshnll/custom-device-emulation-chrome?style=flat-square)](https://github.com/amirshnll/custom-device-emulation-chrome/issues)

**Device dimensions, pixel ratios and user agents for responsive testing in Chrome DevTools.** Find a preset, copy its values and add a custom device in Chrome.

[Browse the catalogue](#device-catalogue) · [Get the extension](#chrome-extension) · [Download JSON](device.json) · [Data quality](docs/data-quality.md)

![Chrome custom device setup](images/step3.PNG)

## Quick start

1. Find your device in the [JSON dataset](device.json) or searchable catalogue below.
2. Open Chrome DevTools with **⌘⌥I** (macOS) or **Ctrl+Shift+I** (Windows/Linux).
3. Toggle the device toolbar with **⌘⇧M** or **Ctrl+Shift+M**.
4. Select **Dimensions → Edit → Add custom device**.
5. Enter the name, width, height and DPR. Choose the appropriate Mobile/Desktop type. User agent is optional; leave it blank when the dataset says `-`.
6. Click **Add**, then select the device from Dimensions.

Copy buttons copy text; they do not automatically import devices into Chrome.

## Device catalogue

The included website searches all devices, filters by device type and data quality, and copies settings or user agents. Each record shows its source and measurement notes.

Run from the repository root:

```sh
python3 scripts/build.py
python3 -m http.server 8000 --directory dist
```

Open http://localhost:8000. The website uses plain HTML, CSS and JavaScript, with no package installation. Serve it over HTTP; opening the HTML file directly cannot reliably load JSON.

### Publish with GitHub Pages

1. Push these files to the repository's `main` branch.
2. In **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**.
3. In **Actions**, run **Deploy device catalogue to GitHub Pages** (or push another commit to `main`).

The workflow validates the dataset, builds the static website and publishes only `dist/`. Subsequent pushes to `main` deploy automatically. No external hosting account or additional deployment secret is needed.

After the first successful deployment, the catalogue will be available at:
[Device catalogue on GitHub Pages](https://amirshnll.github.io/custom-device-emulation-chrome/).

For forks, use the URL shown by your repository's Pages deployment. The website uses relative asset and data URLs so it also works under a repository subpath.

## Chrome extension

**Custom Device Emulation Chrome** puts searchable device dimensions in your Chrome toolbar.

![Searchable device presets in the Chrome extension](images/extension.png)

1. Download this repository using **Code → Download ZIP**, then extract it (or clone it).
2. Open `chrome://extensions` and enable **Developer mode**.
3. Choose **Load unpacked** and select the extracted `plugin` folder.
4. Pin the extension and open it to search devices and view dimensions/DPR.

The extension displays presets; add them to DevTools using the quick start above. It reads the maintained dataset from GitHub, with a bundled offline fallback. No browsing-history permissions are requested. See the [privacy policy](plugin/privacy.md).

No Chrome Web Store listing is linked here because a verified listing has not been provided.

## Understand the data

- **Source checked:** compared with a cited preset; not physical-device verified.
- **Needs review:** historical community data with unknown source or measurement conditions.
- `screen-css` and `viewport-css` distinguish full screen dimensions from browser content dimensions.
- Desktop viewport depends on window size, display scaling and zoom. Historical desktop presets need review.
- A user agent string does not make Chrome emulate Safari. Device Mode is an approximation; test critical behavior on real hardware.

See the [measurement and maintenance policy](docs/data-quality.md), [official Chrome guide](https://developer.chrome.com/docs/devtools/device-mode), and [historical table](docs/legacy-device-table.md).

## Contribute a device

Include its source, measurement type and verification date. See [contributing](CONTRIBUTING.md). Found an incorrect preset? [Report it](https://github.com/amirshnll/custom-device-emulation-chrome/issues/new).

If this saves you time while testing, **star the repository** to help other developers find it.

## License

[MIT](LICENSE). Cited third-party preset sources retain their own licenses; see the data policy.
