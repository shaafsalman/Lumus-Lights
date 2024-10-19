import React, { useEffect, useState } from 'react';
import { fetchProducts, fetchCategories } from '../../Util/fetchers';
import ProductCard from '../../Cards/ProductCard';
import { useDarkMode } from '../../Util/DarkModeContext';
import VerticalSelector from '../../ui/VerticalSelector';
import Dropdown from '../../ui/DropDown';
import {colors,brands} from '../../data';
import Input from '../../ui/Input';
import InfoCard from '../../ui/InfoCard';
const FilterSection = ({ title, children }) => (
  <div className="mb-4">
    <h4 className="font-semibold">{title}</h4>
    {children}
    <div className="border-b border-gray-300 dark:border-gray-700 mb-4" />
  </div>
);

const ColorFilter = ({ selectedColors, setSelectedColors, products }) => {
  const colorCounts = products.reduce((acc, product) => {
    product.skus.forEach((sku) => {
      if (acc[sku.color]) {
        acc[sku.color]++;
      } else {
        acc[sku.color] = 1;
      }
    });
    return acc;
  }, {});

  const colorItems = colors.map(color => ({
    value: color.value,
    label: color.label,
    quantity: colorCounts[color.value] || 0,
    gradient: color.gradient,
  }));

  return (
    <FilterSection >
      <VerticalSelector
        title="Color"
        items={colorItems}
        selectedItems={selectedColors}
        onChange={(value) => {
          setSelectedColors((prev) =>
            prev.includes(value)
              ? prev.filter((item) => item !== value)
              : [...prev, value]
          );
        }}
        showGradient
      />
    </FilterSection>
  );
};


const BrandFilter = ({ selectedBrands, setSelectedBrands, products }) => {
  const brandCounts = products.reduce((acc, product) => {
    if (acc[product.brand]) {
      acc[product.brand]++;
    } else {
      acc[product.brand] = 1;
    }
    return acc;
  }, {});

  const brandItems = brands.map(brand => ({
    value: brand.value,
    label: brand.label,
    quantity: brandCounts[brand.label] || 0,
    logo: brand.logo,
  }));

  return (
    <FilterSection >
      <VerticalSelector
        title="Brand"
        items={brandItems}
        selectedItems={selectedBrands}
        onChange={(value) => {
          setSelectedBrands((prev) =>
            prev.includes(value)
              ? prev.filter((item) => item !== value)
              : [...prev, value]
          );
        }}
        showImage
      />
    </FilterSection>
  );
};
const PriceFilter = ({ selectedPriceRange, setSelectedPriceRange }) => (
  <FilterSection title="Price">
    <div className="p-2 flex gap-2">
      <Input
        id="min-price"
        label="Min Price"
        type="number"
        value={selectedPriceRange.min}
        onChange={(e) => setSelectedPriceRange((prev) => ({
          ...prev,
          min: e.target.value,
        }))}
        required={false}
      />
      <Input
        id="max-price"
        label="Max Price"
        type="number"
        value={selectedPriceRange.max}
        onChange={(e) => setSelectedPriceRange((prev) => ({
          ...prev,
          max: e.target.value,
        }))}
        required={false}
      />
    </div>
  </FilterSection>
);

const CategoryFilter = ({ categories, selectedCategories, setSelectedCategories, products }) => {
  const categoryCounts = products.reduce((acc, product) => {
    if (acc[product.category_name]) {
      acc[product.category_name]++;
    } else {
      acc[product.category_name] = 1;
    }
    return acc;
  }, {});

  const categoryItems = Object.keys(categoryCounts).map((category) => ({
    value: category,
    label: category,
    quantity: categoryCounts[category],
  }));

  return (
    <FilterSection >
      <VerticalSelector
        title="Category"
        items={categoryItems}
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
};

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
    const sortedProducts = [...products].sort((a, b) =>
      value === 'low-to-high' ? a.price - b.price : b.price - a.price
    );
    setProducts(sortedProducts);
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
    <div className="productsPage ">
      <div className="mx-10">
        <div className="flex flex-row">
          <div className={`w-1/4 border-r ${isDarkMode ? 'border-white' : 'border-gray-300'}`}>
            <h3 className="font-semibold tracking-tighter text-2xl mb-3.5">Filters</h3>
            <div className={`border-b ${isDarkMode ? 'border-white' : 'border-gray-300'} mb-2`} />
            <CategoryFilter categories={categories} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} products={products} />
            <ColorFilter selectedColors={selectedColors} setSelectedColors={setSelectedColors} products={products} />
            <BrandFilter selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands} products={products} />
            <PriceFilter selectedPriceRange={selectedPriceRange} setSelectedPriceRange={setSelectedPriceRange} />
          </div>

          <div className={`w-3/4 `}>
            <div className={`flex items-center border-b ${isDarkMode ? 'border-white' : 'border-gray-300'} `}>
              <div className="flex-1 flex justify-between items-center">
                <span className="text-sm ml-8">Home / Products</span>
                <div className="flex items-center mb-2">
                  <label className="text-xs mr-2">Sort by </label>
                  <Dropdown
                    values={sortOptions.map(option => option.label)}
                    heading=""
                    onChange={handleSortChange}
                  />
                </div>
              </div>
            </div>

            <div className="px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
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
