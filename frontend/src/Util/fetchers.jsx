import axios from 'axios';
import backendUrl from './backendURL';
const apiUrl = import.meta.env.VITE_API_URL || backendUrl;

// Fetch products
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Fetch categories
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

