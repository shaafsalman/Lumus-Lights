import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { productsState } from "../../../Store/store";
import { ChevronDown, ChevronUp, Box, PackageCheck, ShoppingCart } from "lucide-react"; // Import Lucide icons

function ItemsSoldCard() {
  const [sortedItems, setSortedItems] = useState([]);
  const [sortDescending, setSortDescending] = useState(true);
  const products = useRecoilValue(productsState).allProducts;

  const aggregateProductData = (products) =>
    products.map((product) => {
      const totalSold = product.skus.reduce((acc, sku) => acc + sku.sold, 0);
      const totalStock = product.skus.reduce((acc, sku) => acc + sku.stock, 0);
      return {
        id: product.id,
        name: product.name,
        sold: totalSold,
        stock: totalStock,
      };
    });

  useEffect(() => {
    const sortedData = aggregateProductData(products).sort((a, b) =>
      sortDescending ? b.sold - a.sold : a.sold - b.sold
    );
    setSortedItems(sortedData);
  }, [products, sortDescending]);

  return (
    <div className="bg-card-light rounded-xl shadow-lg p-6 w-full max-w-lg flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <Box className="h-6 w-6 " />
          <p className="text-2xl font-semibold ">Items Sold</p>
        </div>
        <button
          className="flex items-center gap-2 px-3 py-1 text-sm font-medium  rounded-lg shadow-sm  transition"
          onClick={() => setSortDescending((prev) => !prev)}
        >
          {sortDescending ? "Descending" : "Ascending"}
          {sortDescending ? (
            <ChevronDown className="h-5 w-5 " />
          ) : (
            <ChevronUp className="h-5 w-5 " />
          )}
        </button>
      </div>
      <div className="flex flex-col divide-y divide-gray-300">
        {sortedItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center py-3 px-4 transition"
          >
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-5 w-5 " />
              <p className="text-base font-medium ">{item.name}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 text-sm font-semibold ">
                <PackageCheck className="h-4 w-4 text-green-500" />
                Sold: {item.sold}
              </div>
              <div className="flex items-center gap-1 text-sm font-medium ">
                <Box className="h-4 w-4 text-blue-500" />
                Stock: {item.stock}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemsSoldCard;
