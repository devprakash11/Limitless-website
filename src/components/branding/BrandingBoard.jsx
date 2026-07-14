const boardItems = [
  {
    label: "Logo System",
    key: "logoSystem",
  },
  {
    label: "Brand Pattern",
    key: "pattern",
  },
  {
    label: "Color Palette",
    key: "colors",
  },
  {
    label: "Typography",
    key: "typography",
  },
  {
    label: "Apparel Mockup",
    key: "apparel",
  },
  {
    label: "Bag Mockup",
    key: "bag",
  },
  {
    label: "Packaging",
    key: "packaging",
  },
];

function BrandingBoard({ brand }) {
  return (
    <div className="bcpro-board">
      <h3>{brand.brandName}</h3>

      <div className="bcpro-main-logo-box">
        <img src={brand.images.heroLogo} alt={`${brand.brandName} main logo`} />
      </div>

      <div className="bcpro-board-grid">
        {boardItems.map((item) => (
          <article className="bcpro-board-box" key={item.key}>
            <span>{item.label}</span>

            <img
              src={brand.images[item.key]}
              alt={`${brand.brandName} ${item.label}`}
            />
          </article>
        ))}
      </div>
    </div>
  );
}

export default BrandingBoard;