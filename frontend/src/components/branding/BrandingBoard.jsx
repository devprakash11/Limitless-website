const boardItems = [
  { label: "Logo System", key: "logoSystem" },
  { label: "Brand Pattern", key: "pattern" },
  { label: "Color Palette", key: "colors" },
  { label: "Typography", key: "typography" },
  { label: "Apparel Mockup", key: "apparel" },
  { label: "Bag Mockup", key: "bag" },
  { label: "Packaging", key: "packaging" },
];

function BrandingBoard({ brand }) {
  if (!brand) return null;

  const images = brand.images ?? {};
  const fallbackImage = images.heroLogo || brand.image || "";

  return (
    <div className="bcpro-board">
      <h3>{brand.brandName}</h3>

      <div className="bcpro-main-logo-box">
        {fallbackImage ? (
          <img
            src={fallbackImage}
            alt={`${brand.brandName} main logo`}
          />
        ) : (
          <p>Hero logo image is not available.</p>
        )}
      </div>

      <div className="bcpro-board-grid">
        {boardItems.map((item) => {
          const imageSource = images[item.key] || fallbackImage;

          return (
            <article className="bcpro-board-box" key={item.key}>
              <span>{item.label}</span>

              {imageSource ? (
                <img
                  src={imageSource}
                  alt={`${brand.brandName} ${item.label}`}
                  loading="lazy"
                />
              ) : (
                <p>{item.label} image is not available.</p>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default BrandingBoard;