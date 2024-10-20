import React, {useState,useEffect } from 'react';
import axios from 'axios';
import backendUrl from './backendURL';

const apiUrl = import.meta.env.VITE_API_URL || backendUrl;

export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProductsAsync = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoriesAsync = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchProductsAsync();
    fetchCategoriesAsync();
  }, []);

  return { products, categories, loading };
};

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/products`);
    setProducts(response.data);
  } catch (error) {
    console.error('Error fetching products:', error);
    setProducts([]);
  } finally {
    setLoading(false);
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/categories`);
    setCategories(response.data);
  } catch (error) {
    console.error('Error fetching categories:', error);
    setCategories([]);
  }
};



export const fetchPromotionalMessage = async () => {
  try {
    const response = await axios.get(`${apiUrl}/promotion/promotional-message`);
    return response.data;
  } catch (error) {
    console.error('Error fetching promotional message:', error);
    throw error;
  }
};

export const updatePromotionalMessage = async (message, active) => {
  try {
    const response = await axios.post(`${apiUrl}/promotion/promotional-message`, {
      message,
      active,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating promotional message:', error);
    throw error;
  }
};

export const setPromotionalMessageStatus = async (active) => {
  try {
    const response = await axios.post(`${apiUrl}/promotion/promotional-message/activate`, {
      active,
    });
    return response.data;
  } catch (error) {
    console.error('Error setting promotional message status:', error);
    throw error;
  }
};

export const fetchPromotionalImages = async () => {
  try {
    const response = await axios.get(`${apiUrl}/promotion/promotional-images`);
    console.log(response.data);
    return response.data;

  } catch (error) {
    console.error('Error fetching promotional images:', error);
    throw error;
  }
};

export const addPromotionalImage = async (base64Image, name, active) => {
  try {
    const response = await axios.post(`${apiUrl}/promotion/promotional-image`, {
      imageFile: base64Image,
      name, // Add name to the request body
      active: active || false,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding promotional image:', error);
    throw error;
  }
};



export const editPromotionalImage = async ({ index, newUrl, active }) => {
  try {
    const response = await axios.put(`${apiUrl}/promotion/promotional-image`, {
      index,
      newUrl,
      active,
    });
    return response.data;
  } catch (error) {
    console.error('Error editing promotional image:', error);
    throw error;
  }
};

export const deletePromotionalImage = async ({ index }) => {
  try {
    const response = await axios.delete(`${apiUrl}/promotion/promotional-image`, {
      data: { index },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting promotional image:', error);
    throw error;
  }
};

export const activateDeactivatePromotionalImage = async (imageID,active) => {
  try {
    const response = await axios.post(`${apiUrl}/promotion/promotional-image/activate`, {
      imageID,active
    });
    return response.data; 
  } catch (error) {
    console.error('Error updating image status:', error);
    throw error; 
  }
};
;
