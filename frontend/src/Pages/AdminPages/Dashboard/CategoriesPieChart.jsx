import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { PieChart } from "react-minimal-pie-chart";
import { productsState } from "../../../Store/store";

export default function CategoriesPieChart() {
  const products = useRecoilValue(productsState).allProducts;
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const categoryCount = {};
    products.forEach((product) => {
      const categoryName = product.category_name || "Uncategorized";
      let totalSold = 0;
      product.skus.forEach((sku) => {
        totalSold += sku.sold || 0;
      });
      categoryCount[categoryName] = (categoryCount[categoryName] || 0) + totalSold;
    });

    const categoryColors = [
      "#00FFFF", // brightCyan
      "#DC143C", // crimsonRed
      "#32CD32", // limeGreen
      "#FF1493", // deepPink
      "#708090", // slateGray
      "#A7F3D0", // Custom light green
      "#D6E4E5", // Custom light gray
      "#FFDDC1", // Custom peach
      "#9B9BFF", // Custom lavender
      "#F3E1F5", // Custom pink
    ];

    const formattedData = Object.entries(categoryCount)
      .map(([name, count], index) => ({
        value: count,
        name,
        color: categoryColors[index % categoryColors.length], // Map colors cyclically
      }))
      .filter((category) => category.value >= 1);

    setCategoryData(formattedData);
  }, [products]);

  const totalProductsSold = categoryData.reduce(
    (sum, category) => sum + category.value,
    0
  );

  const defaultRadius = 40; // Smaller chart size

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-card-light rounded-lg shadow-lg w-full max-w-md">
      <p className="mb-4 text-2xl font-semibold ">
        Category Sales 
      </p>
      <div className="relative w-64 h-64">
        <PieChart
          data={categoryData.map((category) => ({
            title: category.name,
            value: category.value,
            color: category.color,
          }))}
          radius={defaultRadius}
          lineWidth={30}
          segmentsStyle={{
            transition: "stroke .3s",
            cursor: "pointer",
            strokeLinecap: "round",
          }}
          animate
        />
      </div>
      <p className="mt-4 text-lg font-semibold ">
        Total Products Sold:{" "}
        <span className="text-primary">{totalProductsSold}</span>
      </p>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {categoryData.map((category, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg shadow-sm"
          >
            <span
              className="inline-block w-4 h-4 rounded-full"
              style={{ backgroundColor: category.color }}
            ></span>
            <p className="text-sm font-medium text-gray-700">
              {category.name}: <span className="text-gray-900">{category.value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
