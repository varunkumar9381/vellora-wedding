export default function SectionTitle({ eyebrow, title, linkText, linkTo }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {linkText && <a className="text-link" href={linkTo}>{linkText} →</a>}
    </div>
  );
}
