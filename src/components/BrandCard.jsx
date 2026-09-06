
export function BrandCard({ brand }) {
  return (
    <article className="brand-card">
      <div className={`brand-logo ${brand.logo ? "has-logo" : "placeholder"}`}>
        {brand.logo ? (
          <img src={brand.logo} alt="" />
        ) : null}
      </div>

      <div className="brand-copy">
        <h3>{brand.name}</h3>
        <p>No-cost EMIs upto {brand.months} months</p>
      </div>
    </article>
  );
}