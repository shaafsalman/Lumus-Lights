import { useState } from 'react';
import Modal from '../ui/Modal';

const ProductDetailsModal = ({ product, isOpen, onClose }) => {
  if (!isOpen) return null;

  const [productDetails] = useState(product || {});
  const { name, description, category_name, skus = [], thumbnail, brand } = productDetails;

  // Define columns and keys for SKU details
  const [skuColumns] = useState([
    { header: 'SKU', key: 'sku' },
    { header: 'Color', key: 'color' },
    { header: 'Size', key: 'size' },
    { header: 'Price', key: 'price', format: (value) => `Pkr${value}` },
    { header: 'Stock', key: 'stock' },
    { header: 'Images', key: 'images' },
  ]);

  return (
    <Modal title="Details" isOpen={isOpen} onClose={onClose}>
      <div className="p-4">
        {productDetails ? (
          <>
            <h2 className="text-lg font-bold mb-4">{name}</h2>
            {thumbnail && <img src={thumbnail} alt={name} className="w-40 h-auto mb-4" />}
            <p><strong>Description:</strong> {description || "N/A"}</p>
            <p><strong>Brand:</strong> {brand || "N/A"}</p>
            <p><strong>Category:</strong> {category_name || "N/A"}</p>

            <h3 className="text-md font-semibold mt-4 mb-2">SKU Details:</h3>
            {skus.length > 0 ? (
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    {skuColumns.map(({ header }) => (
                      <th key={header} className="border border-gray-300 px-2 py-1">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {skus.map((skuItem) => (
                    <tr key={skuItem.id}>
                      {skuColumns.map(({ key, format }) => (
                        <td key={key} className="border border-gray-300 px-2 py-1">
                          {key === 'images' ? (
                            skuItem.images && skuItem.images.length > 0 ? (
                              skuItem.images.map((image, idx) => (
                                <img key={idx} src={image.url} alt={skuItem.sku} className="w-20 h-auto mr-2" />
                              ))
                            ) : (
                              <span>No Images</span>
                            )
                          ) : (
                            format ? format(skuItem[key] || "N/A") : (skuItem[key] || "N/A")
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No SKU details available.</p>
            )}
          </>
        ) : (
          <p>No product details available.</p>
        )}
      </div>
    </Modal>
  );
};

export default ProductDetailsModal;
