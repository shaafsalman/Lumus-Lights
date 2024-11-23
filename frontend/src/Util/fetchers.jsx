import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backendUrl from './backendURL';

const apiUrl = import.meta.env.VITE_API_URL || backendUrl;

// Custom Hook: Fetch products and categories
export const useFetchProducts = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const [productsResponse, categoriesResponse] = await Promise.all([
                    axios.get(`${apiUrl}/api/products`),
                    axios.get(`${apiUrl}/api/categories`),
                ]);

                setProducts(productsResponse.data);
                setCategories(categoriesResponse.data);
            } catch (error) {
                console.error('Error fetching products or categories:', error);
                setProducts([]);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { products, categories, loading };
};

// Fetch products
export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${apiUrl}/api/products`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Fetch categories
export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${apiUrl}/api/categories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// Fetch promotional message
export const fetchPromotionalMessage = async () => {
    try {
        const response = await axios.get(`${apiUrl}/promotion/promotional-message`);
        return response.data;
    } catch (error) {
        console.error('Error fetching promotional message:', error);
        throw error;
    }
};

// Update promotional message
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

// Set promotional message status
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

// Fetch promotional images
export const fetchPromotionalImages = async () => {
    try {
        const response = await axios.get(`${apiUrl}/promotion/promotional-images`);
        return response.data;
    } catch (error) {
        console.error('Error fetching promotional images:', error);
        throw error;
    }
};

// Add promotional image
export const addPromotionalImage = async (base64Image, name, active = false) => {
    try {
        const response = await axios.post(`${apiUrl}/promotion/promotional-image`, {
            imageFile: base64Image,
            name,
            active,
        });
        return response.data;
    } catch (error) {
        console.error('Error adding promotional image:', error);
        throw error;
    }
};

// Edit promotional image
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

// Delete promotional image
export const deletePromotionalImage = async (index) => {
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

// Activate/Deactivate promotional image
export const activateDeactivatePromotionalImage = async (imageID, active) => {
    try {
        const response = await axios.post(`${apiUrl}/promotion/promotional-image/activate`, {
            imageID,
            active,
        });
        return response.data;
    } catch (error) {
        console.error('Error updating image status:', error);
        throw error;
    }
};
