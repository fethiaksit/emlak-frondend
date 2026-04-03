import { useEffect, useState } from 'react';
import ListingCard from '../components/ListingCard';
import { getListings } from '../services/api';

function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await getListings();
        const payload = response.data;

        // API çıktısı farklı şekillerde gelebilirse sade bir normalizasyon yapıyoruz.
        const normalizedListings = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.listings)
            ? payload.listings
            : Array.isArray(payload?.data)
              ? payload.data
              : [];

        setListings(normalizedListings);
      } catch {
        setError('İlanlar alınırken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  if (!listings.length) {
    return <p>İlan bulunamadı</p>;
  }

  return (
    <section>
      <h1>Ana Sayfa</h1>
      <div className="listings-grid">
        {listings.map((listing) => (
          <ListingCard key={listing._id || listing.id} listing={listing} />
        ))}
      </div>
    </section>
  );
}

export default Home;
