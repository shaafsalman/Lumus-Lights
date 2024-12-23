import { atom } from 'recoil';

// Atom for storing categories data
export const categoriesState = atom({
  key: 'categoriesState',
  default: [],  // Defaults to an empty array, expecting a list of category objects
});

// Atom for storing products data with various classifications
export const productsState = atom({
  key: 'productsState',
  default: {
    allProducts: [],       // All products fetched
    likedProducts: [],     // Products liked by the user
    cartProducts: [],      // Products added to the cart
    featuredProducts: [],  // Products marked as featured
  },
});

// Atom for the user's shopping cart
export const cartState = atom({
  key: 'cartState',
  default: [],  // Defaults to an empty array, expects a list of product IDs or detailed objects
});

// Atom for the user's wishlist
export const wishlistState = atom({
  key: 'wishlistState',
  default: [],  // Defaults to an empty array, expects a list of product IDs or detailed objects
});
