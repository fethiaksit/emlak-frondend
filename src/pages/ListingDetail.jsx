import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getListingById } from '../services/api';

function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchListing = async () => {
      if (!id) {
        console.log('ListingDetail hatası: route parametresi id undefined.');
        setError('İlan bulunamadı');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const response = await getListingById(id);
        const payload = response.data;
        const listingData = payload?.listing || payload?.data || payload || null;

        if (!listingData || !listingData._id) {
          console.log('ListingDetail hatası: geçerli ilan verisi bulunamadı.', payload);
          setError('İlan bulunamadı');
          setListing(null);
          return;
        }

        setListing(listingData);
      } catch {
        setError('İlan detayı alınırken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  if (!listing) {
    return <p>İlan bulunamadı</p>;
  }

  return (
    <section className="detail-card">
      <h1>{listing.title}</h1>
      <p>
        <strong>Açıklama:</strong> {listing.description}
      </p>
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
      <p>
        <strong>Oluşturulma Tarihi:</strong>{' '}
        {listing.createdAt ? new Date(listing.createdAt).toLocaleString('tr-TR') : '-'}
      </p>
      <Link to="/" className="button-link">
        Ana Sayfa
      </Link>
    </section>
  );
}

export default ListingDetail;
