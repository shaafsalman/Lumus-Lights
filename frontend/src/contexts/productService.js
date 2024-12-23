// handleReFetch.js
import { fetchProducts } from './../api/fetchers';
import { useSetRecoilState } from 'recoil';
import { productsState } from './../state/store';

export const useReFetchProducts = () => {
  const setProducts = useSetRecoilState(productsState);

  const handleReFetch = async () => {
    try {
      const updatedProducts = await fetchProducts();
      setProducts(prevState => ({
        ...prevState,
        allProducts: updatedProducts,
      }));
      console.log("Refetched products after update",updatedProducts);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  return handleReFetch;
};
