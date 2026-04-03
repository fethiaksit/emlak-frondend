import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080'
});

export const getAllListings = () => api.get('/api/listings');
export const getListingById = (id) => api.get(`/api/listings/${id}`);

// Geriye dönük uyumluluk
export const getListings = getAllListings;

export const createListing = (listingData) => api.post('/api/listings', listingData);
export const deleteListing = (id) => api.delete(`/api/listings/${id}`);

export default api;
