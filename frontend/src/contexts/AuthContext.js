import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateToken, authenticateWithEmail,registerUser } from '../api/authApi';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { ANDROID_CLIENT_ID, WEB_CLIENT_ID } from '@env';

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: WEB_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
  });
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userData = await AsyncStorage.getItem('user');
  
        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          const isValidToken = await validateToken(token);  // Ensure token is valid
          if (isValidToken) {
            setIsAuthenticated(true);
            setUser(parsedUser);
            setRole(parsedUser.role);
          } else {
            logout();  // Log out if the token is not valid
          }
        } else {
          logout();  // Log out if no user data or token exists
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
      setLoading(false);
    };
  
    checkAuth();
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      const {authentication} = response;
      const token = authentication?.accessToken;
      handleGoogleSignIn(token);
    }
  }, [response]);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');  // Also clear user data
      setIsAuthenticated(false);
      setUser(null);
      setRole(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const login = async (userData) => {
    try {
      await AsyncStorage.setItem('token', userData.token);
      await AsyncStorage.setItem('user', JSON.stringify(userData)); 
      setUser(userData);
      setRole(userData.role);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login error:", error);
    }
  };


  const getToken = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (error) {
    console.error('Error getting token from AsyncStorage:', error);
    throw error;
  }
};

  const getUserInfoFromGoogle = async (token) => {
    try {
      const response = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      throw error;
    }
  };

  const handleGoogleSignIn = async (googleIdToken) => {
    try {
      const googleUserInfo = await getUserInfoFromGoogle(googleIdToken);
      const { email, name, id: googleId } = googleUserInfo;
      const response = await authenticateWithEmail({ email, name, googleId });

      if (response.status === 'success') {
        const { user, token } = response;
        await login({ ...user, token });
      } else {
        console.error("Login failed with Google user info");
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const handleEmailLogin = async (credentials) => {
    try {
      const response = await authenticateWithEmail(credentials);
      if (response.status === 'success') {
        const { user, token } = response;
        await login({ ...user, token });
        return { success: true, role: user.role };
      } else {
        return { success: false, message: 'Invalid credentials' };
      }
    } catch (error) {
      console.error("Email login error:", error);
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setUser(user);
        return user;
      }
      return null;
    } catch (error) {
      console.error("Error retrieving user from AsyncStorage:", error);
      return null;
    }
  };

  const handleRegister = async (data) => {
      const response = await registerUser(data);
      return response;
  };


  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        role,
        login,
        logout,
        handleEmailLogin,
        handleGoogleSignIn,
        getUserData,
        handleRegister,
        getToken,
        promptGoogleLogin: () => promptAsync(),
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
