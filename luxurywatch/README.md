# Luxury Watch Prelander

Static HTML/CSS/JavaScript project compatible with GitHub Pages and Cloudflare Pages.

## Before publishing

1. Open `app.js` and replace `YOUR_SOI_LINK_HERE` with the final offer URL.
2. Set `campaignDeadline` to the real promotion deadline in ISO 8601 format, for example `2026-12-31T23:59:59-05:00`. The countdown stays hidden when this value is empty or expired.
3. Replace `contact@example.com` in `index.html` with a monitored contact address.
4. Review the legal text for the promotion and target jurisdictions.

`assets/watch-blue.jpg`, `assets/watch-gold.jpg`, and `assets/watch-silver.jpg` are independent product images used for the style choices and completion screen. Keep replacement images square and consistently framed.

## Hero image search terms

Use a licensed stock-photo provider and search for:

- `three luxury watches blue gold pink light gray background`
- `luxury watch trio product photography white background`
- `premium watches blue gold silver sweepstakes hero`
- `unbranded luxury watch collection landscape banner`

Recommended image specification: landscape JPG or WebP, 1400–1800 px wide, under 250 KB after compression, no visible brand logo, and a light gray or pale blue background that visually matches the PrizeZappy offer page. Prefer an image showing three distinct watches so the style-preference question feels visually connected to the prize.

## Social proof

The social-proof section is hidden until verified reviews are added in `CONFIG.socialProof.reviews` inside `app.js`.

Each review uses this format:

```js
{
  name: "First name and last initial",
  quote: "Verified participant feedback",
  source: "Verified purchase · Month Year"
}
```

## Tracking parameters

Incoming query parameters are passed to the destination URL unless that parameter already exists on the configured destination.
