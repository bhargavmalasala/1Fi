import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ChevronDown, Search, Star, X, Check, SlidersHorizontal } from "lucide-react";
import { getMarketplaceProduct, getMarketplaceProducts } from "../marketplace/api.js";

const formatINR = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

function ProductCard({ product, onOpen }) {
  const emi = product.emiPlans[0];

  return (
    <button className="market-product-card" onClick={() => onOpen(product.id)}>
      <div className="product-image-wrap">
        <img src={product.image} alt="" className="product-image" />
        <span className="product-badge">0% EMI</span>
      </div>
      <div className="market-product-info">
        <span className="market-category">{product.category}</span>
        <h3>{product.name}</h3>
        <div className="market-price-row">
          <strong>{formatINR(product.price)}</strong>
          <del>{formatINR(product.originalPrice)}</del>
        </div>
        <p>from {formatINR(emi.monthly)}/mo</p>
      </div>
    </button>
  );
}

function ProductGrid({ products, loading, error, onRetry, onOpen, hasProducts }) {
  if (loading) {
    return (
      <div className="market-grid" aria-label="Loading products">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="product-skeleton" key={index}>
            <div className="skeleton-image" />
            <div className="skeleton-line wide" />
            <div className="skeleton-line" />
            <div className="skeleton-line short" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="market-message">
        <strong>Unable to load products</strong>
        <span>Please try again.</span>
        <button type="button" onClick={onRetry}>Try again</button>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="market-message">
        <strong>{hasProducts ? "No matching products" : "No products available"}</strong>
        <span>{hasProducts ? "Try a different search or category." : "Please check back soon."}</span>
      </div>
    );
  }

  return (
    <div className="market-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onOpen={onOpen} />
      ))}
    </div>
  );
}

function ProductDetail({ productId, onBack }) {
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedEmi, setSelectedEmi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");

    getMarketplaceProduct(productId)
      .then((data) => {
        if (!active) return;
        setProduct(data);
        setSelectedVariant(data.variants[0]);
        setSelectedEmi(data.emiPlans[1] || data.emiPlans[0]);
      })
      .catch(() => {
        if (active) setError("We couldn't load this product.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [productId, retryCount]);

  if (loading) {
    return (
      <section className="market-detail">
        <button className="detail-back" onClick={onBack}><ArrowLeft size={18} /> Back</button>
        <div className="detail-loading">
          <div className="detail-image-skeleton" />
          <div className="skeleton-line wide" />
          <div className="skeleton-line" />
          <div className="skeleton-line short" />
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="market-detail">
        <button className="detail-back" onClick={onBack}><ArrowLeft size={18} /> Back</button>
        <div className="market-message">
          <strong>Unable to load product</strong>
          <span>{error || "Please try again."}</span>
          <button type="button" onClick={() => setRetryCount((count) => count + 1)}>Try again</button>
        </div>
      </section>
    );
  }

  const currentPrice = selectedVariant?.price ?? product.price;

  return (
    <section className="market-detail">
      <button className="detail-back" onClick={onBack}>
        <ArrowLeft size={18} />
        Marketplace
      </button>

      <div className="detail-image-card">
        <img src={product.image} alt={product.name} />
        <span className="product-badge">0% EMI</span>
      </div>

      <div className="detail-heading">
        <span className="market-category">{product.category}</span>
        <h1>{product.name}</h1>
        <div className="detail-rating">
          <Star size={14} fill="currentColor" />
          <strong>{product.rating}</strong>
          <span>({product.reviews} reviews)</span>
        </div>
        <div className="detail-price">
          <strong>{formatINR(currentPrice)}</strong>
          <del>{formatINR(product.originalPrice)}</del>
        </div>
        <p className="detail-description">{product.description}</p>
      </div>

      <div className="detail-section">
        <div className="detail-section-title">
          <strong>Choose a variant</strong>
          <span>{selectedVariant?.label}</span>
        </div>
        <div className="variant-list">
          {product.variants.map((variant) => (
            <button
              key={variant.id}
              className={`variant ${selectedVariant?.id === variant.id ? "selected" : ""}`}
              onClick={() => setSelectedVariant(variant)}
            >
              {variant.label}
              {selectedVariant?.id === variant.id && <Check size={15} />}
            </button>
          ))}
        </div>
      </div>

      <div className="detail-section">
        <div className="detail-section-title">
          <strong>Choose EMI plan</strong>
          <span>0% interest</span>
        </div>
        <div className="emi-list">
          {product.emiPlans.map((plan) => (
            <button
              key={plan.id}
              className={`emi-option ${selectedEmi?.id === plan.id ? "selected" : ""}`}
              onClick={() => setSelectedEmi(plan)}
            >
              <span className="emi-radio">
                {selectedEmi?.id === plan.id && <i />}
              </span>
              <span className="emi-copy">
                <strong>{plan.months} months</strong>
                <small>{plan.interest}</small>
              </span>
              <strong>{formatINR(plan.monthly)}/mo</strong>
            </button>
          ))}
        </div>
      </div>

      <div className="detail-section">
        <strong className="detail-section-heading">Product details</strong>
        <ul className="detail-points">
          {product.details.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>

      <div className="detail-cta-wrap">
        <div>
          <small>{selectedEmi?.months}-month EMI</small>
          <strong>{formatINR(selectedEmi?.monthly)}/month</strong>
        </div>
        <button
          className="market-cta"
          onClick={() => alert(`Selected ${product.name} on ${selectedEmi.months}-month EMI.`)}
        >
          Proceed with plan
        </button>
      </div>
    </section>
  );
}

export function Marketplace() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);

  const loadProducts = () => {
    setLoading(true);
    setError("");
    getMarketplaceProducts()
      .then(setProducts)
      .catch(() => setError("load"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(products.map((product) => product.category))],
    [products]
  );

  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesQuery =
        !normalized ||
        product.name.toLowerCase().includes(normalized) ||
        product.category.toLowerCase().includes(normalized);
      const matchesCategory = category === "All" || product.category === category;
      return matchesQuery && matchesCategory;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      return 0;
    });
  }, [products, query, category, sort]);

  if (selectedProductId) {
    return (
      <ProductDetail
        productId={selectedProductId}
        onBack={() => setSelectedProductId(null)}
      />
    );
  }

  return (
    <section className="marketplace">
      <div className="marketplace-heading">
        <div>
          <span className="market-eyebrow">SHOP SMARTER</span>
          <h1>1Fi Marketplace</h1>
          <p>Shop your favourites with easy EMI plans.</p>
        </div>
      </div>

      <label className="market-search">
        <Search size={17} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products..."
          aria-label="Search Marketplace products"
        />
        {query && (
          <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
            <X size={15} />
          </button>
        )}
      </label>

      {!loading && !error && (
        <>
          <div className="market-toolbar">
            <div className="category-scroll">
              {categories.map((item) => (
                <button
                  key={item}
                  className={`category-chip ${category === item ? "selected" : ""}`}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <label className="sort-control">
              <SlidersHorizontal size={15} />
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low</option>
                <option value="price-high">Price: High</option>
              </select>
              <ChevronDown size={13} />
            </label>
          </div>
        </>
      )}

      <ProductGrid
        products={visibleProducts}
        loading={loading}
        error={error}
        hasProducts={products.length > 0}
        onRetry={loadProducts}
        onOpen={setSelectedProductId}
      />
    </section>
  );
}
