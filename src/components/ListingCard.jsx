import { Link } from 'react-router-dom';

function ListingCard({ listing }) {
  return (
    <article className="listing-card">
      <h3>{listing.title}</h3>
      <p>
        <strong>Fiyat:</strong> {Number(listing.price).toLocaleString('tr-TR')} ₺
      </p>
      <p>
        <strong>Şehir/İlçe:</strong> {listing.city} / {listing.district}
      </p>
      <p>
        <strong>Mülk Tipi:</strong> {listing.propertyType}
      </p>
      <p>
        <strong>İlan Tipi:</strong> {listing.listingType}
      </p>
      <p className="risk-tag">
        <strong>Deprem Riski:</strong> {listing.earthquakeRisk}
      </p>

      <Link to={`/listing/${listing._id}`} className="button-link">
        Detay
      </Link>
    </article>
  );
}

export default ListingCard;
