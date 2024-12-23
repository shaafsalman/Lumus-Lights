import { useSetRecoilState } from 'recoil';
import { cartState, wishlistState, productsState } from '../state/store';
import { fetchCart, fetchWishlist, fetchProducts, addToCart, removeFromCart, updateCartQuantity, addToWishlist, removeFromWishlist } from '../api/fetchers';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Add an item to the cart
export const addItemToCart = async (skuId, quantity) => {
  try {
    const userId = await getUserId();
    if (!userId) {
      console.log('User is not logged in, cannot add to cart.');
      return;
    }
    console.log('Adding item to cart context ',userId,skuId);


    // Add item to cart via API
    await addToCart(userId,skuId, quantity=1);

    // Fetch the updated cart from API
    const updatedCart = await fetchCart(userId);

    // Update the Recoil cart state directly
    const setCart = useSetRecoilState(cartState);
    setCart(updatedCart);
  } catch (error) {
    console.error('Error adding item to cart:', error);
  }
};

// Remove an item from the cart
export const removeItemFromCart = async (skuId) => {
  try {
    const userId = await getUserId();
    if (!userId) {
      console.log('User is not logged in, cannot remove from cart.');
      return;
    }

    // Remove item from cart via API
    await removeFromCart(skuId);

    // Fetch the updated cart from API
    const updatedCart = await fetchCart(userId);

    // Update the Recoil cart state directly
    const setCart = useSetRecoilState(cartState);
    setCart(updatedCart);
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};

// Update the quantity of an item in the cart
export const updateCartItemQuantity = async (skuId, quantity) => {
  try {
    const userId = await getUserId();
    if (!userId) {
      console.log('User is not logged in, cannot update cart quantity.');
      return;
    }

    // Update the cart item quantity via API
    await updateCartQuantity(skuId, quantity);

    // Fetch the updated cart from API
    const updatedCart = await fetchCart(userId);

    // Update the Recoil cart state directly
    const setCart = useSetRecoilState(cartState);
    setCart(updatedCart);
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
  }
};

// Add an item to the wishlist
export const addItemToWishlist = async (skuId) => {
  try {
    console.log('Adding item to wishlist',userId,skuId);

    const userId = await getUserId();
    if (!userId) {
      console.log('User is not logged in, cannot add to wishlist.');
      return;
    }
    console.log('Adding item to wishlist',userId,skuId);

    // Add item to wishlist via API
    await addToWishlist(userId,skuId);

    // Fetch the updated wishlist from API
    const updatedWishlist = await fetchWishlist(userId);

    // Update the Recoil wishlist state directly
    const setWishlist = useSetRecoilState(wishlistState);
    setWishlist(updatedWishlist);
  } catch (error) {
    console.error('Error adding item to wishlist:', error);
  }
};

// Remove an item from the wishlist
export const removeItemFromWishlist = async (skuId) => {
  try {
    const userId = await getUserId();
    if (!userId) {
      console.log('User is not logged in, cannot remove from wishlist.');
      return;
    }

    // Remove item from wishlist via API
    await removeFromWishlist(skuId);

    // Fetch the updated wishlist from API
    const updatedWishlist = await fetchWishlist(userId);

    // Update the Recoil wishlist state directly
    const setWishlist = useSetRecoilState(wishlistState);
    setWishlist(updatedWishlist);
  } catch (error) {
    console.error('Error removing item from wishlist:', error);
  }
};

// Helper function to get user ID from AsyncStorage
const getUserId = async () => {
  try {
    const storedUser = await AsyncStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      return parsedUser.id;
    }
    return null;
  } catch (error) {
    console.error('Error getting user ID from AsyncStorage:', error);
    return null;
  }
};
