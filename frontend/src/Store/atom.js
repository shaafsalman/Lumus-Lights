import { atom } from 'recoil';

// Atom for Categories
export const categoriesState = atom({
  key: 'categoriesState', 
  default: [], 
});

// Atom for Products
export const productsState = atom({
  key: 'productsState', 
  default: [],  
});
