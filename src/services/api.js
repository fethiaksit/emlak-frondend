import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080'
});

export const getListings = () => api.get('/api/listings');
export const getListingById = (id) => api.get(`/api/listings/${id}`);
export const createListing = (listingData) => api.post('/api/listings', listingData);
export const deleteListing = (id) => api.delete(`/api/listings/${id}`);

export default api;
