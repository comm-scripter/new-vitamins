# Category badge images

The badge image on both card sizes renders inside a fixed pill using
`object-fit: fill`, so the source photo is stretched to match the pill's
proportions. To avoid any visible stretching, crop the image to the pill's
aspect ratio **before** uploading.

- **Target aspect ratio:** 2.2 : 1 (width : height)
- **Suggested export size:** 880 × 400px (any size at the same ratio works, e.g. 660 × 300px, 1100 × 500px)

Crop to that ratio in your image editor, then upload via the CMS
(`public/admin/config.yml` → category → "Background image").
