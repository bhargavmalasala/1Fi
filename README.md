# 1Fi Shop — React recreation

## Visual specification

- Reference mobile canvas: approximately **380px wide**.
- Hero: **380 × 234px** (source artwork cropped directly from the supplied reference screenshot).
- Main horizontal content inset: approximately **26px**.
- Tabs: approximately **328 × 40px**, overlapping the hero by about **20px**.
- Search: approximately **328 × 34px**, with a 1px light border and 18px radius.
- Section heading: approximately **16px**, bold.
- Brand cards: approximately **328px wide**, ~42px tall including padding, 10px radius, subtle border/shadow.
- Logo box: approximately **32 × 32px**, 7px radius.
- Bottom navigation: approximately **340 × 58px**, fixed, centered, 18px top radius, subtle upward shadow.
- Page background: very light gray, approximately `#f7f7f7`.
- Active purple is approximately `#7635ea`.

Values above are visual approximations from the supplied screenshot; the screenshot remains the design authority.

## Run

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Notes

The promotional banner is cropped directly from the supplied screenshot so its artwork and typography remain faithful. Only the logo assets that are clearly visible in the supplied long screenshot are cropped and reused; the remaining brand rows use neutral empty logo placeholders rather than invented logos.

## JavaScript version

This project intentionally uses `.js` and `.jsx` files only. There is no TypeScript configuration or TypeScript dependency.


## Assignment implementation — 1Fi Marketplace

The Shop page now has the required three options:

1. Top Brands — existing implementation retained.
2. Nearby Stores — intentionally blank/empty as permitted.
3. 1Fi Marketplace — fully implemented.

Marketplace data is kept outside the UI in `src/marketplace/products.js` and exposed through `src/marketplace/api.js`, which simulates asynchronous API retrieval.

Implemented Marketplace flow:
- Product listing with image, category, product name, pricing and EMI-from price.
- Product search.
- Category filtering.
- Price sorting.
- Loading skeletons.
- API error state with retry.
- Empty search state.
- Product detail view.
- Variant selection.
- EMI plan selection.
- Selected-plan summary.
- Proceed CTA.
- Responsive two-column mobile product grid.
- Bottom navigation remains visible and content is padded/sticky CTA is positioned above it.

The product catalogue and detailed visual treatment are implemented as a consistent 1Fi-style Marketplace flow.
