# 1Fi SDE Intern Assignment — Submission Notes

## Implemented

The existing Shop page has been extended with the required third option:

- Top Brands — existing behavior retained.
- Nearby Stores — intentionally left blank/empty as permitted by the assignment.
- 1Fi Marketplace — implemented end-to-end.

Marketplace includes:
- Product listing
- Product images
- Product names
- Pricing and original pricing
- Product categories
- Search
- Category filters
- Price sorting
- Product detail view
- Product variants
- EMI plans
- EMI selection
- Product details
- Selected-plan summary
- Proceed CTA
- Loading states
- Error + retry state
- Empty search state
- Responsive layout
- Reusable components
- Mock asynchronous API/data layer

## Data architecture

Product data lives in `src/marketplace/products.js`.

The UI retrieves products through `src/marketplace/api.js`.

This keeps product/EMI information separate from presentation and provides an API-shaped integration point for a real backend later.

