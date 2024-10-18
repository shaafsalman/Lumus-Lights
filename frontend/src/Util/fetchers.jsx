import axios from 'axios';
import backendUrl from './backendURL';

const apiUrl = import.meta.env.VITE_API_URL || backendUrl;

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
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
    const response = await axios.patch(`${apiUrl}/promotion/promotional-message/activate`, {
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

export const activateDeactivatePromotionalImage = async ({ index, active }) => {
  try {
    const response = await axios.patch(`${apiUrl}/promotion/promotional-image/activate`, {
      index,
      active,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating promotional image status:', error);
    throw error;
  }
};
