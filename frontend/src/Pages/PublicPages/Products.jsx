import React, { useEffect, useState } from 'react';
import {useFetchProducts  } from '../../Util/fetchers';
import ProductCard from '../../Cards/ProductCard';
import { useDarkMode } from '../../Util/DarkModeContext';
import VerticalSelector from '../../ui/VerticalSelector';
import Dropdown from '../../ui/DropDown';
import { colors, brands } from '../../data';
import Input from '../../ui/Input';
import NoProducts from '../../ui/NoProducts';
import Loading from '../../ui/Loading';

const FilterSection = ({ title, children }) => {
  const { isDarkMode } = useDarkMode(); 

  return (
    <div className="mb-4">
      <h4 className="font-semibold">{title}</h4>
      {children}
      <div className={`border-b mb-4 ${isDarkMode ? 'border-white' : 'border-gray-300'}`} />
    </div>
  );
};

const ColorFilter = ({ selectedColors, setSelectedColors, products }) => {
  const colorCounts = products.reduce((acc, product) => {
    product.skus.forEach((sku) => {
      acc[sku.color] = (acc[sku.color] || 0) + 1;
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
    <FilterSection title="Color">
      <VerticalSelector
        items={colorItems}
        selectedItems={selectedColors}
        onChange={(value) => {
          setSelectedColors(prev => 
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
          );
        }}
        showGradient
      />
    </FilterSection>
  );
};
const BrandFilter = ({ selectedBrands, setSelectedBrands, products }) => {
  const brandCounts = products.reduce((acc, product) => {
    const brandName = product.brand.toLowerCase(); // Convert to lower case
    acc[brandName] = (acc[brandName] || 0) + 1;
    return acc;
  }, {});

  const brandItems = brands.map(brand => {
    const brandLabel = brand.label.toLowerCase(); 
    return {
      value: brand.value,
      label: brand.label,
      quantity: brandCounts[brandLabel] || 0,
      logo: brand.logo,
    };
  });

  return (
    <FilterSection title="Brand">
      <VerticalSelector
        items={brandItems}
        selectedItems={selectedBrands}
        onChange={(value) => {
          setSelectedBrands(prev => 
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
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
        onChange={(e) => setSelectedPriceRange(prev => ({ ...prev, min: e.target.value }))}
        required={false}
      />
      <Input
        id="max-price"
        label="Max Price"
        type="number"
        value={selectedPriceRange.max}
        onChange={(e) => setSelectedPriceRange(prev => ({ ...prev, max: e.target.value }))}
        required={false}
      />
    </div>
  </FilterSection>
);

const CategoryFilter = ({ categories, selectedCategories, setSelectedCategories, products }) => {
  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category_name] = (acc[product.category_name] || 0) + 1;
    return acc;
  }, {});

  const categoryItems = Object.keys(categoryCounts).map(category => ({
    value: category,
    label: category,
    quantity: categoryCounts[category],
  }));

  return (
    <FilterSection title="Category">
      <VerticalSelector
        items={categoryItems}
        selectedItems={selectedCategories}
        onChange={(value) => {
          setSelectedCategories(prev => 
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
          );
        }}
      />
    </FilterSection>
  );
};


const FilterSlider = ({
  categories,
  selectedCategories,
  setSelectedCategories,
  selectedColors,
  setSelectedColors,
  selectedBrands,
  setSelectedBrands,
  selectedPriceRange,
  setSelectedPriceRange,
  isDarkMode,
  products,
}) => {
  return (
    <div
      className={`w-full md:w-1/4 py-4 pl-4 border-r overflow-y-auto   ${isDarkMode ? 'border-white' : 'border-gray-300'}`}
    >
      <h3 className={`font-semibold tracking-tighter text-xl mb-0.5`}>
        Filters
      </h3>
      <div className={`border-b ${isDarkMode ? 'border-white' : 'border-gray-300'} mb-2`} />
      <CategoryFilter
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        products={products}
      />
      <ColorFilter
        selectedColors={selectedColors}
        setSelectedColors={setSelectedColors}
        products={products}
      />
      <BrandFilter
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        products={products}
      />
      <PriceFilter
        selectedPriceRange={selectedPriceRange}
        setSelectedPriceRange={setSelectedPriceRange}
      />
    </div>
  );
};

const MainSection = ({ filteredProducts, sortOptions, handleSortChange, isDarkMode }) => {
  return (
    <div className={`w-full h-screen`}>
      <div className={`flex sm-hidden  items-center border-b ${isDarkMode ? 'border-white' : 'border-gray-300'}`}>
        <div className="flex-1 flex justify-between items-center">
          <span className="text-sm ml-8">Home / Products</span>
          <div className="flex items-center mb-2 px-10">
            <label className="text-xs mr-2">Sort by </label>
            <Dropdown
              values={sortOptions.map(option => option.label)}
              heading=""
              onChange={handleSortChange}
            />
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const Products = () => {
  const { products, categories, loading } = useFetchProducts(); 
  const [error, setError] = useState(null);
  const { isDarkMode } = useDarkMode();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  
  const [selectedPriceRange, setSelectedPriceRange] = useState({ min: '', max: '' });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortOrder, setSortOrder] = useState('');

  const handleSortChange = (value) => {
    setSortOrder(value);
    const sortedProducts = [...products].sort((a, b) =>
      value === 'low-to-high' ? a.skus[0].price - b.skus[0].price : b.skus[0].price - a.skus[0].price
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
        ? selectedCategories.map(cat => cat.toLowerCase()).includes(product.category_name.toLowerCase())
        : true;
  
      const inColor = selectedColors.length
        ? product.skus.some((sku) => selectedColors.map(color => color.toLowerCase()).includes(sku.color.toLowerCase()))
        : true;
  
      const inBrand = selectedBrands.length
        ? selectedBrands.map(brand => brand.toLowerCase()).includes(product.brand.toLowerCase())
        : true;
  
      const inPriceRange =
        (selectedPriceRange.min === '' || product.skus.some(sku => sku.price >= selectedPriceRange.min)) &&
        (selectedPriceRange.max === '' || product.skus.some(sku => sku.price <= selectedPriceRange.max));
  
      return inCategory && inColor && inBrand && inPriceRange;
    });
  };

  const filteredProducts = filterProducts();

  if (loading) return <Loading />;
  if (error) return <NoProducts message={error} />;
  if (filteredProducts.length === 0) return <NoProducts message="No products to show." />;

  const isMobile = window.innerWidth < 1000;

  return (
    <div className="productsPage mt-6">
      <div className="relative">
        {isMobile && (
          <>
            <button
              className="absolute mt-16 right-4 z-20 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primaryHover transition-colors"
              onClick={() => setIsFilterVisible(!isFilterVisible)}
            >
              {isFilterVisible ? '×' : '+'}
            </button>
            <div
              className={`absolute overflow-x-auto rounded-md bg-white text-secondary transition-transform z-10 duration-300 ease-in-out transform ${isFilterVisible ? 'translate-x-0' : 'translate-x-full'}`}
            >
              <FilterSlider
                categories={categories}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedColors={selectedColors}
                setSelectedColors={setSelectedColors}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                selectedPriceRange={selectedPriceRange}
                setSelectedPriceRange={setSelectedPriceRange}
                isDarkMode={isDarkMode}
                products={products}
              />
            </div>
          </>
        )}
        
        {/* Always show products or no products message */}
        {!isMobile ? ( 
          <div className="flex flex-row mx-10">
            <FilterSlider
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              selectedPriceRange={selectedPriceRange}
              setSelectedPriceRange={setSelectedPriceRange}
              isDarkMode={isDarkMode}
              products={products}
            />
            <MainSection
              filteredProducts={filteredProducts}
              sortOptions={sortOptions}
              handleSortChange={handleSortChange}
              isDarkMode={isDarkMode}
            />
          </div>
        ) : (
          <MainSection
            filteredProducts={filteredProducts}
            sortOptions={sortOptions}
            handleSortChange={handleSortChange}
            isDarkMode={isDarkMode}
          />
        )}
      </div>
    </div>
  );
};

export default Products;
