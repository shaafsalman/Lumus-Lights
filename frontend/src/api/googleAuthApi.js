import axios from 'axios';
import Constants from 'expo-constants';
import { url } from '@env'; 
import { backendUrl } from '../util/backendUrl';

const  baseUrl = url || backendUrl;




// Function to authenticate with Google using ID token
export const authenticateWithGoogle = async (googleIdToken) => {
  try {
    const response = await googleApi.post('/google-auth', { token: googleIdToken });
    return response;
  } catch (error) {
    console.error('Error during Google authentication:', error);
    throw error;
  }
};

export default googleApi;
