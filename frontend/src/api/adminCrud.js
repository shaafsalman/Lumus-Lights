import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { url } from '@env'; 
import { backendUrl } from '../util/backendUrl';

const  baseUrl = backendUrl || url;




// Function to get token from AsyncStorage
const getToken = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (error) {
    console.error('Error getting token from AsyncStorage:', error);
    throw error;
  }
};

// Function to get user data from AsyncStorage
const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData); 
    }
    return null;
  } catch (error) {
    console.error('Error retrieving user from AsyncStorage:', error);
    return null;
  }
};

// Function to perform the API request
const apiRequest = async (method, url, data = {}) => {
  try {
    // Get token and user data from AsyncStorage
    const token = await getToken();
    const user = await getUserData();

    // Ensure user and token are available
    if (!user || !token) {
      console.error('Error: User or token is missing');
      return null;
    }

    const userId = user?.id;
    
    // Construct the API config
    const config = {
      method,
      url: `${baseUrl}${url}`,
      headers: { Authorization: `Bearer ${token}` },
      data: { userId, ...data },
    };

    // console.log('Request Config:', config);


    // Send the request
    const response = await axios(config);
    // console.log('Response Data:', response.data);

    return response.data;
  } catch (error) {
    console.error(`Error with ${method} request to ${url}:`, error);
    throw error;
  }
};

// Example API functions
export const addProductApi = (productData) => apiRequest('post', '/api/products', productData);
export const addAdApi = (adData) => apiRequest('post', '/api/ads', adData);
export const removeProductApi = (productId) => apiRequest('delete', `/api/products/${productId}`);



export const fetchStockReportApi = async () => {
  try {
    const token = await getToken();
    if (!token) throw new Error('Authorization token not found.');

    const response = await axios.get(`${baseUrl}/report/stock-report`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'arraybuffer', // Ensure we receive binary data
    });

    const pdfData = response.data;

    // Convert ArrayBuffer to Base64 string
    const base64Data = arrayBufferToBase64(pdfData);

    const filePath = `${FileSystem.documentDirectory}Stock_Report.pdf`;

    // Write the Base64 data to a file
    await FileSystem.writeAsStringAsync(filePath, base64Data, {
      encoding: FileSystem.EncodingType.Base64,
    });
    // console.log(filePath);
    return filePath; 
  } catch (error) {
    console.error('Error fetching stock report as PDF:', error);
    throw error;
  }
};
const arrayBufferToBase64 = (buffer) => {
  const uint8Array = new Uint8Array(buffer);
  let binary = '';
  uint8Array.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return global.btoa(binary);  
};
