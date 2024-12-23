import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { categoriesState, productsState } from '../Store/store';
import { fetchCategories, fetchProducts } from '../Util/fetchers';
import Loading from '../ui/Loading';

const LoadState = () => {
  const setCategories = useSetRecoilState(categoriesState);
  const setAllProducts = useSetRecoilState(productsState);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading) setError('Loading timeout: Data fetching took too long.');
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [loading]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [categories, products] = await Promise.all([
          fetchCategories(),
          fetchProducts()
        ]);
        setCategories(categories);
        setAllProducts(prevState => ({
          ...prevState,
          allProducts: products
        }));
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError('Failed to fetch data. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [setCategories, setAllProducts]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;  // Provide visual feedback for errors
  }

  return null;
};

export default LoadState;
