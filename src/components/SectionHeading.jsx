function SectionHeading({ label, title, text }) {
  return (
    <div className="section-heading">
      {label && <span className="section-label">{label}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export default SectionHeading;
