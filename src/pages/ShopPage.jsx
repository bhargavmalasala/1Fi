import { useMemo, useState } from "react";
import { brands } from "../data/brands.js";
import { HeroBanner } from "../components/HeroBanner.jsx";
import { ShopTabs } from "../components/ShopTabs.jsx";
import { SearchBar } from "../components/SearchBar.jsx";
import { BrandList } from "../components/BrandList.jsx";
import { BottomNavigation } from "../components/BottomNavigation.jsx";
import { Marketplace } from "../components/Marketplace.jsx";

export function ShopPage() {
  const [activeTab, setActiveTab] = useState("brands");
  const [query, setQuery] = useState("");

  const filteredBrands = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return brands;
    return brands.filter((brand) => brand.name.toLowerCase().includes(normalized));
  }, [query]);

  const changeTab = (tab) => {
    setActiveTab(tab);
    if (tab !== "brands") setQuery("");
  };

  return (
    <main className="app-shell">
      <HeroBanner />

      <section className="content">
        <ShopTabs active={activeTab} onChange={changeTab} />

        {activeTab === "brands" && (
          <>
            <SearchBar value={query} onChange={setQuery} />
            <section className="brands-section" aria-labelledby="top-brands">
              <h1 id="top-brands">Top Brands</h1>
              <BrandList brands={filteredBrands} query={query} />
            </section>
          </>
        )}

        {activeTab === "nearby" && (
          <section className="nearby-empty">
            <strong>Nearby Stores</strong>
            <span>No nearby stores to show.</span>
          </section>
        )}

        {activeTab === "marketplace" && <Marketplace />}
      </section>

      <BottomNavigation />
    </main>
  );
}