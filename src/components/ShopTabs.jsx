export function ShopTabs({ active, onChange }) {
  const tabs = [
    { id: "brands", label: "Top Brands" },
    { id: "nearby", label: "Nearby Stores" },
    { id: "marketplace", label: "1Fi Marketplace" },
  ];

  return (
    <div className="tabs tabs-three" role="tablist" aria-label="Shop category">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab ${active === tab.id ? "active" : ""}`}
          onClick={() => onChange(tab.id)}
          role="tab"
          aria-selected={active === tab.id}
        >
          <span>{tab.label}</span>
          {active === tab.id && <i />}
        </button>
      ))}
    </div>
  );
}