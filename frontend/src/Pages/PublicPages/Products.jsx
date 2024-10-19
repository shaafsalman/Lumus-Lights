import React, { useEffect, useState } from 'react';
import { fetchProducts, fetchCategories } from '../../Util/fetchers';
import ProductCard from '../../Cards/ProductCard';
import { colors, brands } from './../../data';
import { useDarkMode } from '../../Util/DarkModeContext';
import VerticalSelector from '../../ui/VerticalSelector';
import Dropdown from '../../ui/DropDown';

const FilterSection = ({ title, children }) => (
  <div className="mb-4">
    <h4 className="font-semibold">{title}</h4>
    {children}
    <div className="border-b border-gray-300 dark:border-gray-700 mb-4" />
  </div>
);

const ColorFilter = ({ selectedColors, setSelectedColors }) => (
  <FilterSection title="Color">
    <ul className="pl-4 flex flex-wrap gap-2">
      {colors.map((color) => (
        <li
          key={color.value}
          className="flex items-center cursor-pointer"
          onClick={() =>
            setSelectedColors((prev) =>
              prev.includes(color.value)
                ? prev.filter((item) => item !== color.value)
                : [...prev, color.value]
            )
          }
        >
          <div className={`w-5 h-5 rounded-full mr-2 ${color.gradient}`}></div>
          <span>{color.label}</span>
        </li>
      ))}
    </ul>
  </FilterSection>
);

const BrandFilter = ({ selectedBrands, setSelectedBrands }) => (
  <FilterSection title="Brand">
    <VerticalSelector
      title="Brand"
      items={brands}
      selectedItems={selectedBrands}
      onChange={(value) => {
        setSelectedBrands((prev) =>
          prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        );
      }}
    />
  </FilterSection>
);

const PriceFilter = ({ selectedPriceRange, setSelectedPriceRange }) => (
  <FilterSection title="Price">
    <div className="pl-4 flex gap-2">
      <input
        type="number"
        name="min"
        value={selectedPriceRange.min}
        onChange={(e) =>
          setSelectedPriceRange((prev) => ({
            ...prev,
            min: e.target.value,
          }))
        }
        placeholder="Min"
        className="w-20 p-1 border rounded border-gray-300 dark:border-gray-700"
      />
      <input
        type="number"
        name="max"
        value={selectedPriceRange.max}
        onChange={(e) =>
          setSelectedPriceRange((prev) => ({
            ...prev,
            max: e.target.value,
          }))
        }
        placeholder="Max"
        className="w-20 p-1 border rounded border-gray-300 dark:border-gray-700"
      />
    </div>
  </FilterSection>
);

const CategoryFilter = ({ categories, selectedCategories, setSelectedCategories }) => (
  <FilterSection title="Category">
    <VerticalSelector
      title="Category"
      items={categories.map((cat) => ({ value: cat.name, label: cat.name }))}
      selectedItems={selectedCategories}
      onChange={(value) => {
        setSelectedCategories((prev) =>
          prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        );
      }}
    />
  </FilterSection>
);

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDarkMode } = useDarkMode();

  const [selectedPriceRange, setSelectedPriceRange] = useState({ min: '', max: '' });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    const fetchOptionsData = async () => {
      setLoading(true);
      try {
        const [fetchedProducts, fetchedCategories] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        setProducts(fetchedProducts);
        setCategories(fetchedCategories);
      } catch (err) {
        console.error('Error fetching options:', err);
        setError('Failed to fetch options data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOptionsData();
  }, []);

  const handleSortChange = (value) => {
    setSortOrder(value);
    if (value === 'low-to-high') {
      setProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else if (value === 'high-to-low') {
      setProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  };

  const sortOptions = [
    { value: 'low-to-high', label: 'Low to High' },
    { value: 'high-to-low', label: 'High to Low' },
  ];

  const filterProducts = () => {
    return products.filter((product) => {
      const inCategory = selectedCategories.length
        ? selectedCategories.includes(product.category_name)
        : true;

      const inColor = selectedColors.length
        ? product.skus.some((sku) => selectedColors.includes(sku.color))
        : true;

      const inBrand = selectedBrands.length
        ? selectedBrands.includes(product.brand)
        : true;

      const inPriceRange =
        (selectedPriceRange.min === '' || product.skus.some(sku => sku.price >= selectedPriceRange.min)) &&
        (selectedPriceRange.max === '' || product.skus.some(sku => sku.price <= selectedPriceRange.max));

      return inCategory && inColor && inBrand && inPriceRange;
    });
  };

  const filteredProducts = filterProducts();

  if (loading) return <div className="text-center">Loading products...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="productsPage">
      <div className={`container mx-auto p-4`}>
        <div className="flex flex-row">
          <div className={`w-1/4 border-r-2 ${isDarkMode ? 'border-white' : 'border-gray-300'} pr-4 relative`}>
            <h3 className="font-semibold mb-2">Filters</h3>
            <div className={`border-b ${isDarkMode ? 'border-white' : 'border-gray-300'} mb-4`} />
            <ColorFilter selectedColors={selectedColors} setSelectedColors={setSelectedColors} />
            <BrandFilter selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands} />
            <PriceFilter selectedPriceRange={selectedPriceRange} setSelectedPriceRange={setSelectedPriceRange} />
            <CategoryFilter categories={categories} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
          </div>

          <div className={`w-3/4 pl-6 relative`}>
            <div className={`flex items-center border-b ${isDarkMode ? 'border-white' : 'border-gray-300'} py-4`}>
              <div className="flex-1 flex justify-between items-center">
                <span className="text-sm">Home / Products</span>
                <div className="flex items-center">
                  <label className="text-sm mr-2">Sort by:</label>
                  <Dropdown
                    values={sortOptions.map(option => option.label)}
                    heading=""
                    onChange={handleSortChange}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
