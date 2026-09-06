import { BrandCard } from "./BrandCard.jsx";

export function BrandList({ brands, query }) {
  if (brands.length === 0) {
    return (
      <div className="empty-state">
        <strong>No stores found</strong>
        <span>Try a different store name.</span>
      </div>
    );
  }

  return (
    <div className="brand-list">
      {brands.map((brand) => (
        <BrandCard key={brand.id} brand={brand} />
      ))}
    </div>
  );
}