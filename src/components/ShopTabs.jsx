export function ShopTabs({ active, onChange }) {
  return (
    <div className="tabs" role="tablist" aria-label="Shop category">
      <button
        className={`tab ${active === "brands" ? "active" : ""}`}
        onClick={() => onChange("brands")}
        role="tab"
        aria-selected={active === "brands"}
      >
        <span>Top Brands</span>
        {active === "brands" && <i />}
      </button>

      <button
        className={`tab ${active === "nearby" ? "active" : ""}`}
        onClick={() => onChange("nearby")}
        role="tab"
        aria-selected={active === "nearby"}
      >
        <span>Nearby Stores</span>
        {active === "nearby" && <i />}
      </button>
    </div>
  );
}