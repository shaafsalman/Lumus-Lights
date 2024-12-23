import axios from 'axios';
import { url } from '@env'; // Import your base API URL from the environment file
import { backendUrl } from '../util/backendUrl';

const  baseUrl = backendUrl || url;


export const authenticateWithEmail = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/login`, data);

    if (response.status === 200) { 
      return { 
        status: 'success', 
        message: response.data.message || 'Authentication successful.',
        token: response.data.token,
        user: response.data.user 
      };
    } 

    return { 
      status: 'failure', 
      message: response.data.message || 'Invalid email or password.' 
    };

  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response);
      return { 
        status: 'failure', 
        message: error.response.data.message || 'An error occurred during authentication.' 
      };
    }

    console.error('Error during authentication:', error);
    return { 
      status: 'failure', 
      message: 'Network error. Please check your internet connection and try again.' 
    };
  }
};


// Function to authenticate with Google
export const authenticateWithGoogle = async (googleToken) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/google-auth`, { token: googleToken });
    return response;
  } catch (error) {
    console.error('Error during Google authentication:', error);
    throw error;
  }
};

// Function to register a new user
export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/register`, data);

    if (response.status === 201) {
      return { status: 'success', message: response.data.message || 'User registered successfully.' };
    }
    
    return { 
      status: 'failure', 
      message: response.data.message || 'Registration failed. Please check your inputs.' 
    };

  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response);
      return { 
        status: 'failure', 
        message: error.response.data.message || 'An error occurred during registration.' 
      };
    }
    
    console.error('Error during registration:', error);
    return { 
      status: 'failure', 
      message: 'Network error. Please check your internet connection and try again.' 
    };
  }
};



export const validateToken = async (token) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/validateToken`, { token });
    return response.status === 200; 
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};

