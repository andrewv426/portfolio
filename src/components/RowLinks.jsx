// The small line of links under a row, optionally led by a plain-text label.
function RowLinks({ items = [], label }) {
  if (items.length === 0 && !label) return null;

  return (
    <span className="row-links ui">
      {label && <span>{label}</span>}
      {items.map((item) => (
        <a href={item.href} target="_blank" rel="noreferrer" key={item.label}>
          {item.label}
        </a>
      ))}
    </span>
  );
}

export default RowLinks;
