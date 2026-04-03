import { useEffect, useState } from 'react';
import { createListing, deleteListing, getListings } from '../services/api';

const initialForm = {
  title: '',
  description: '',
  price: '',
  city: '',
  district: '',
  propertyType: '',
  listingType: '',
  earthquakeRisk: 'düşük'
};

function Admin() {
  const [listings, setListings] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const loadListings = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getListings();
      setListings(response.data || []);
    } catch {
      setError('İlanlar alınırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadListings();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      setError('');
      await createListing({ ...formData, price: Number(formData.price) });
      setFormData(initialForm);
      await loadListings();
    } catch {
      setError('İlan eklenirken bir hata oluştu.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setError('');
      await deleteListing(id);
      await loadListings();
    } catch {
      setError('İlan silinirken bir hata oluştu.');
    }
  };

  return (
    <section>
      <h1>Admin</h1>

      <form onSubmit={handleSubmit} className="form-card">
        <h2>İlan Ekle</h2>

        <label>
          Başlık
          <input name="title" value={formData.title} onChange={handleChange} required />
        </label>

        <label>
          Açıklama
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>

        <label>
          Fiyat
          <input name="price" type="number" min="0" value={formData.price} onChange={handleChange} required />
        </label>

        <label>
          Şehir
          <input name="city" value={formData.city} onChange={handleChange} required />
        </label>

        <label>
          İlçe
          <input name="district" value={formData.district} onChange={handleChange} required />
        </label>

        <label>
          Mülk Tipi
          <input name="propertyType" value={formData.propertyType} onChange={handleChange} required />
        </label>

        <label>
          İlan Tipi
          <input name="listingType" value={formData.listingType} onChange={handleChange} required />
        </label>

        <label>
          Deprem Riski
          <select name="earthquakeRisk" value={formData.earthquakeRisk} onChange={handleChange}>
            <option value="düşük">düşük</option>
            <option value="orta">orta</option>
            <option value="yüksek">yüksek</option>
          </select>
        </label>

        <button type="submit" disabled={submitting}>
          {submitting ? 'Yükleniyor...' : 'İlan Ekle'}
        </button>
      </form>

      {error && <p className="error-text">{error}</p>}

      <div>
        <h2>Mevcut İlanlar</h2>
        {loading ? (
          <p>Yükleniyor...</p>
        ) : listings.length === 0 ? (
          <p>İlan bulunamadı</p>
        ) : (
          <ul className="admin-list">
            {listings.map((listing) => (
              <li key={listing._id}>
                <div>
                  <strong>{listing.title}</strong>
                  <div className="muted-text">
                    {listing.city} / {listing.district} - {listing.earthquakeRisk}
                  </div>
                </div>
                <button type="button" className="danger-button" onClick={() => handleDelete(listing._id)}>
                  Sil
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default Admin;
