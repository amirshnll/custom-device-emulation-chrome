# Data quality and measurement policy

`device.json` is the source of truth. Existing category arrays and core fields remain compatible; review metadata is additive.

## Dimensions

- `viewport-css`: browser content dimensions in CSS pixels for the cited preset.
- `screen-css`: full CSS screen dimensions used as a DevTools layout preset. Browser chrome may reduce the actual content viewport.
- `legacy-unspecified`: historical values whose measurement basis is unknown. Do not assume physical pixels and CSS pixels are interchangeable.
- DPR is physical pixels per CSS pixel. Desktop viewport varies with window size, display scaling and zoom; hardware names alone do not determine it.

## Evidence

`source-checked` means width, height and DPR were compared with the cited source. It does **not** mean physical-device testing. `last_verified` is the source-check date, not the device release date. Unknown sources and dates remain `null`, with `status: unverified`.

The iPhone 15 family uses Playwright's `screen` dimensions. Galaxy S24 and Pixel 7 use its `viewport` dimensions. These deliberately retain their measurement type instead of treating screen and content viewport as identical. Versioned user agents are examples; `-` means unspecified. Leave the optional Chrome field blank in that case.

Current cited dataset: [Playwright v1.55.0 presets](https://github.com/microsoft/playwright/blob/v1.55.0/packages/playwright-core/src/server/deviceDescriptorsSource.json). Playwright is Apache-2.0 licensed; see [upstream license](https://github.com/microsoft/playwright/blob/v1.55.0/LICENSE).

Historical desktop values are flagged for review, not silently converted by dividing by DPR. A reliable correction needs evidence about display scaling and window dimensions.

## Maintenance cadence

Review new Apple, Samsung and Google devices monthly and after major launches. This is a maintainer checklist, not an automated claim of freshness:

1. Find a versioned browser-emulation preset or record a physical-device measurement.
2. Include source URL, browser/OS, orientation, zoom and whether dimensions describe screen or viewport.
3. Add/update the record and source-check date only after comparison.
4. Run `python3 scripts/build.py`; document changes in the changelog.
5. Review outstanding `unverified` records, prioritizing desktop scaling and historical user agents.

For real measurements, use a page with `<meta name="viewport" content="width=device-width, initial-scale=1">` and report `innerWidth`, `innerHeight`, `screen.width`, `screen.height` and `devicePixelRatio` separately at default zoom.

## Emulation limits

Chrome Device Mode approximates layout and some input behavior. Changing the user agent does not switch Chrome to Safari/WebKit. It does not reproduce real mobile hardware or performance. Validate critical behavior on actual devices. [Official Chrome documentation](https://developer.chrome.com/docs/devtools/device-mode).
