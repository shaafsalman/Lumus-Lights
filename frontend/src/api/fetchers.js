import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { url } from '@env'; // Import your base API URL from the environment file
import { backendUrl } from '../util/backendUrl';

const  baseUrl = backendUrl || url;
console.log(baseUrl);

// Function to fetch categories
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/categories`);
    // You can log the data here if necessary
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Function to fetch products
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Function to get the user ID from AsyncStorage
const getUserId = async () => {
  try {
    const storedUser = await AsyncStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      userId=parsedUser.id;         
    }    
    if (!userId) {
      console.warn('User ID not found in AsyncStorage');
    }
    return userId;
  } catch (error) {
    console.error('Error getting user ID from AsyncStorage:', error);
    throw error;
  }
};

// Function to fetch the user's cart items
export const fetchCart = async () => {
  try {
    const userId = await getUserId();
    if (!userId) {
      console.log('User is not logged in, cart fetch skipped.');
      return [];  // Return an empty array if the user is not logged in
    }
    const response = await axios.get(`${baseUrl}/api/cart/${userId}`);
    console.log("Cart Items:", JSON.stringify(response.data, null, 2));  // Detailed cart log
    return response.data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return [];  // Fallback to empty array in case of an error
  }
};
export const addToCart = async (userId,skuId, quantity) => {
  try {
    console.log('Adding item to cart api',userId,skuId);

    const response = await axios.post(`${baseUrl}/api/cart`, {
      userId: userId,
      skuId: skuId,
      quantity: quantity,
    });

    console.log(response.data.message);  // Handle success response
  } catch (error) {
    console.error('Error adding item to cart:', error);
  }
};
export const removeFromCart = async (skuId) => {
  try {
    const userId = await getUserId();
    if (!userId) {
      console.log('User is not logged in, cannot remove from cart.');
      return;
    }
    
    const response = await axios.delete(`${baseUrl}/api/cart/${userId}/${skuId}`);

    console.log(response.data.message);  // Handle success response
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};
export const updateCartQuantity = async (skuId, quantity) => {
  try {
    const userId = await getUserId();
    if (!userId) {
      console.log('User is not logged in, cannot update cart quantity.');
      return;
    }
    
    const response = await axios.put(`${baseUrl}/api/cart`, {
      userId: userId,
      skuId: skuId,
      quantity: quantity,
    });

    console.log(response.data.message);  // Handle success response
  } catch (error) {
    console.error('Error updating cart item:', error);
  }
};
export const clearCart = async () => {
  try {
    const userId = await getUserId();
    if (!userId) {
      console.log('User is not logged in, cannot clear cart.');
      return;
    }
    
    const response = await axios.delete(`${baseUrl}/api/cart/${userId}`);

    console.log(response.data.message);  // Handle success response
  } catch (error) {
    console.error('Error clearing cart:', error);
  }
};
export const checkout = async () => {
  try {
    const userId = await getUserId();
    if (!userId) {
      console.log('User is not logged in, cannot proceed with checkout.');
      return;
    }

    // Fetch cart items before checkout
    const cartItems = await fetchCart();

    if (!cartItems || cartItems.length === 0) {
      console.log('Cart is empty, cannot proceed with checkout.');
      return;
    }

    const response = await axios.post(`${baseUrl}/api/checkout`, {
      user_id: userId,
    });

    console.log(response.data.message);  // Handle success response
  } catch (error) {
    console.error('Error during checkout:', error);
  }
};


// Function to fetch the user's wishlist items
export const fetchWishlist = async () => {
  try {
    const userId = await getUserId();
    if (!userId) {
      console.log('User is not logged in, wishlist fetch skipped.');
      return [];  // Return an empty array if the user is not logged in
    }
    const response = await axios.get(`${baseUrl}/api/wishlist/${userId}`);
    console.log("Wishlist Items:", JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error fetching wishlist items:', error);
    return [];  // Fallback to empty array in case of an error
  }
};
export const addToWishlist = async (userId,skuId) => {
  try {
    
    console.log('Adding item to wishlist api ',userId,skuId);    
    const response = await axios.post(`${baseUrl}/api/wishlist`, {
      userId: userId,
      skuId: skuId,
    });

    console.log(response.data.message); 
  } catch (error) {
    console.error('Error adding item to wishlist:', error);
  }
};


export const removeFromWishlist = async (skuId) => {
  try {
    const userId = await getUserId();
    if (!userId) {
      console.log('User is not logged in, cannot remove from wishlist.');
      return;
    }
    
    const response = await axios.delete(`${baseUrl}/api/wishlist/${userId}/${skuId}`);

    console.log(response.data.message);  // Handle success response
  } catch (error) {
    console.error('Error removing item from wishlist:', error);
  }
};


export const clearWishlist = async () => {
  try {
    const userId = await getUserId();
    if (!userId) {
      // console.log('User is not logged in, cannot clear wishlist.');
      return;
    }
    
    const response = await axios.delete(`${baseUrl}/api/wishlist/${userId}`);

    console.log(response.data.message);  // Handle success response
  } catch (error) {
    console.error('Error clearing wishlist:', error);
  }
};


// Function to check if the user is logged in and fetch cart & wishlist
export const checkAndFetchUserData = async () => {
  try {
    const userId = await getUserId();
    if (!userId) {
      // console.log('User is not logged in.');
      return;
    }

    // Fetch cart and wishlist if user is logged in
    const cart = await fetchCart();
    const wishlist = await fetchWishlist();

    // Optionally, handle the fetched data (e.g., update state)
    // console.log('Fetched Cart:', cart);
    // console.log('Fetched Wishlist:', wishlist);
  } catch (error) {
    console.error('Error in checking and fetching user data:', error);
  }
};
