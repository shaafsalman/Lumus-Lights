import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { productsState } from '../../../Store/store';
import ReportCard from '../../../ui/reportCard';
import Table from '../../../ui/Table';
import PDFReport from '../../../Util/PDFReport';
import ExcelReport from '../../../Util/ExcelReport';

const ProductReport = () => {
  const allProducts = useRecoilValue(productsState).allProducts;
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [formData, setFormData] = useState({
    category: '',
    brand: '',
    priceFrom: '',
    priceTo: '',
    stockStatus: '',
    rating: '',
  });
  const [pdfReport, setPdfReport] = useState(null);
  const [excelReport, setExcelReport] = useState(null);

  useEffect(() => {
    setFilteredProducts(allProducts);
  }, [allProducts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const getActiveFilters = () => {
    // Only include filters that have values
    return Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== '')
    );
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...allProducts];
      const activeFilters = getActiveFilters();

      if (activeFilters.category) {
        filtered = filtered.filter(
          (product) =>
            product.category_name.toLowerCase() === activeFilters.category.toLowerCase()
        );
      }

      if (activeFilters.brand) {
        filtered = filtered.filter((product) =>
          product.brand.toLowerCase().includes(activeFilters.brand.toLowerCase())
        );
      }

      if (activeFilters.priceFrom || activeFilters.priceTo) {
        filtered = filtered.filter((product) =>
          product.skus.some((sku) => {
            const price = sku.price;
            return (
              (!activeFilters.priceFrom || price >= parseFloat(activeFilters.priceFrom)) &&
              (!activeFilters.priceTo || price <= parseFloat(activeFilters.priceTo))
            );
          })
        );
      }

      if (activeFilters.stockStatus) {
        filtered = filtered.filter((product) =>
          product.skus.some((sku) =>
            activeFilters.stockStatus === 'in-stock' ? sku.stock > 0 : sku.stock === 0
          )
        );
      }

      if (activeFilters.rating) {
        filtered = filtered.filter((product) =>
          product.skus.some((sku) => sku.rating >= parseFloat(activeFilters.rating))
        );
      }

      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [formData, allProducts]);

  useEffect(() => {
    if (filteredProducts.length > 0) {
      const columns = [
        { label: 'Name', key: 'name' },
        { label: 'Category', key: 'category_name' },
        { label: 'Brand', key: 'brand' },
        { label: 'Price', key: 'price' },
        { label: 'Stock', key: 'stock' },
        { label: 'Rating', key: 'rating' },
      ];

      const reportData = filteredProducts.map((product) => {
        const lowestPriceSku = product.skus.reduce(
          (min, sku) => (sku.price < min.price ? sku : min),
          product.skus[0]
        );
        return {
          name: product.name,
          category_name: product.category_name,
          brand: product.brand,
          price: lowestPriceSku.price,
          stock: lowestPriceSku.stock,
          rating: lowestPriceSku.rating,
        };
      });

      const activeFilters = getActiveFilters();

      const pdfBlob = PDFReport(reportData, columns, 'Product Report', activeFilters);
      setPdfReport(URL.createObjectURL(pdfBlob));

      ExcelReport(reportData, columns, 'Product Report', activeFilters).then((excelBlob) =>
        setExcelReport(URL.createObjectURL(excelBlob))
      );
    }
  }, [filteredProducts]);

  const columns = [
    { label: 'Name', key: 'name' },
    { label: 'Category', key: 'category_name' },
    { label: 'Brand', key: 'brand' },
    { label: 'Price', key: 'price' },
    { label: 'Stock', key: 'stock' },
    { label: 'Rating', key: 'rating' },
  ];

  const tableData = filteredProducts.map((product) => {
    const lowestPriceSku = product.skus.reduce(
      (min, sku) => (sku.price < min.price ? sku : min),
      product.skus[0]
    );
    return {
      id: product.id,
      name: product.name,
      category_name: product.category_name,
      brand: product.brand,
      price: lowestPriceSku.price,
      stock: lowestPriceSku.stock,
      rating: lowestPriceSku.rating,
    };
  });

  return (
    <div>
      <ReportCard
        inputs={[
          { label: 'Category', type: 'text', name: 'category', value: formData.category },
          { label: 'Brand', type: 'text', name: 'brand', value: formData.brand },
          { label: 'Price From', type: 'number', name: 'priceFrom', value: formData.priceFrom },
          { label: 'Price To', type: 'number', name: 'priceTo', value: formData.priceTo },
          {
            label: 'Stock Status',
            type: 'select',
            name: 'stockStatus',
            options: [
              { label: 'All', value: '' },
              { label: 'In Stock', value: 'in-stock' },
              { label: 'Out of Stock', value: 'out-of-stock' },
            ],
            value: formData.stockStatus,
          },
          { label: 'Rating (min)', type: 'number', name: 'rating', value: formData.rating },
        ]}
        handleInputChange={handleChange}
        pdfReport={pdfReport}
        excelReport={excelReport}
        searching={false}
      />
      <Table columns={columns} data={tableData} identifierKey="id" />
    </div>
  );
};

export default ProductReport;
