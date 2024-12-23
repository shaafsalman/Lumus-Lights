import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightColors, darkColors } from './../util/themes';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'CustomFont': require('./../../assets/fonts/PublicaPlay-Regular.otf'), 
        'PB-Bold': require('./../../assets/fonts/publica-play-bold.ttf'), 

      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  const [currentTheme, setCurrentTheme] = useState({});

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('appTheme');
        if (storedTheme) {
          setTheme(storedTheme);
        } else {
          const systemTheme = Appearance.getColorScheme();
          setTheme(systemTheme || 'light');
        }
      } catch (error) {
        console.error('Error loading theme from AsyncStorage:', error);
      }
    };

    loadTheme();
  }, []);

  useEffect(() => {
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem('appTheme', theme);
      } catch (error) {
        console.error('Error saving theme to AsyncStorage:', error);
      }
    };

    saveTheme();
  }, [theme]);

  const currentColors = theme === 'dark' ? darkColors : lightColors;

  // Apply font family globally
  const finalTheme = {
    ...currentColors,
    fontFamily: 'CustomFont',  // Apply globally
  };

  return fontsLoaded ? (
    <ThemeContext.Provider value={{ theme, setTheme, colors: finalTheme }}>
      {children}
    </ThemeContext.Provider>
  ) : null;
};
