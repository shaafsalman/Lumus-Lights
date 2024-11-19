// mockProducts.js

const mockProducts = [
    {
      id: 1,
      name: 'Panasonic Lamp',
      description: 'High-efficiency ceiling ',
      category_id: 1,
      category_name: 'Ceiling Light',
      brand: 'panasonic',
      thumbnail: 'https://lightsource-workdo.myshopify.com/cdn/shop/products/nymane-work-lamp-w-charging-led-bulb-anthracite__0991757_pe819571_s5-removebg-preview_600x600.png?v=1678698784',

      skus: [
        {
          id: 1,
          sku: 'SKU-12345-01',
          price: 50.99,
          stock: 100,
          color: 'white',
          size: 'Medium',
          wattage: 18,
          voltage: 230,
          images: [
            { image_path: 'https://www.panasonic.com/path/to/image1.jpg', is_primary: true },
            { image_path: 'https://www.panasonic.com/path/to/image2.jpg', is_primary: false }
          ]
        },
        {
          id: 2,
          sku: 'SKU-12345-02',
          price: 55.99,
          stock: 50,
          color: 'gold',
          size: 'Large',
          wattage: 25,
          voltage: 230,
          images: [
            { image_path: 'https://www.panasonic.com/path/to/image3.jpg', is_primary: true },
            { image_path: 'https://www.panasonic.com/path/to/image4.jpg', is_primary: false }
          ]
        },
        {
          id: 3,
          sku: 'SKU-12345-03',
          price: 60.99,
          stock: 30,
          color: 'black',
          size: 'Large',
          wattage: 30,
          voltage: 230,
          images: [
            { image_path: 'https://www.panasonic.com/path/to/image5.jpg', is_primary: true },
            { image_path: 'https://www.panasonic.com/path/to/image6.jpg', is_primary: false }
          ]
        }
      ]
    },
   
    
    {
        id: 2,
        name: 'Philips Ceiling ',
        description: 'Energy-efficient ceiling light ',
        category_id: 1,
        category_name: 'Ceiling Light',
        brand: 'phillips',
        thumbnail: 'https://lightsource-workdo.myshopify.com/cdn/shop/products/nymane-led-pendant-lamp-wireless-dimmable-white-spectrum-white__1008045_pe826687_s5-removebg-preview_298b74a6-4082-4999-a24c-e145ebb776bc_500x500.png?v=1678698754',

        skus: [
          {
            id: 4,
            sku: 'SKU-67890-01',
            price: 60.99,
            stock: 120,
            color: 'silver',
            size: 'Medium',
            wattage: 20,
            voltage: 230,
            images: [
              { image_path: 'https://www.philips.com/path/to/image1.jpg', is_primary: true },
              { image_path: 'https://www.philips.com/path/to/image2.jpg', is_primary: false }
            ]
          },
          {
            id: 5,
            sku: 'SKU-67890-02',
            price: 65.99,
            stock: 80,
            color: 'black',
            size: 'Large',
            wattage: 28,
            voltage: 230,
            images: [
              { image_path: 'https://www.philips.com/path/to/image3.jpg', is_primary: true },
              { image_path: 'https://www.philips.com/path/to/image4.jpg', is_primary: false }
            ]
          },
          {
            id: 6,
            sku: 'SKU-67890-03',
            price: 70.99,
            stock: 40,
            color: 'green',
            size: 'Large',
            wattage: 35,
            voltage: 230,
            images: [
              { image_path: 'https://www.philips.com/path/to/image5.jpg', is_primary: true },
              { image_path: 'https://www.philips.com/path/to/image6.jpg', is_primary: false }
            ]
          }
        ]
      },
      {
        id: 3,
        name: 'Panasonic Lamp',
        description: 'High-efficiency ceiling ',
        category_id: 1,
        category_name: 'Ceiling Light',
        brand: 'panasonic',
        thumbnail: 'https://lightsource-workdo.myshopify.com/cdn/shop/products/forsa-work-lamp-nickel-plated__0609296_pe684433_s5-removebg-preview_600x600.png?v=1678698797',
  
        skus: [
          {
            id: 1,
            sku: 'SKU-12345-01',
            price: 50.99,
            stock: 100,
            color: 'black',
            size: 'Medium',
            wattage: 18,
            voltage: 230,
            images: [
              { image_path: 'https://www.panasonic.com/path/to/image1.jpg', is_primary: true },
              { image_path: 'https://www.panasonic.com/path/to/image2.jpg', is_primary: false }
            ]
          },
          {
            id: 2,
            sku: 'SKU-12345-02',
            price: 55.99,
            stock: 50,
            color: 'red',
            size: 'Large',
            wattage: 25,
            voltage: 230,
            images: [
              { image_path: 'https://www.panasonic.com/path/to/image3.jpg', is_primary: true },
              { image_path: 'https://www.panasonic.com/path/to/image4.jpg', is_primary: false }
            ]
          },
          {
            id: 3,
            sku: 'SKU-12345-03',
            price: 60.99,
            stock: 30,
            color: 'blue',
            size: 'Large',
            wattage: 30,
            voltage: 230,
            images: [
              { image_path: 'https://www.panasonic.com/path/to/image5.jpg', is_primary: true },
              { image_path: 'https://www.panasonic.com/path/to/image6.jpg', is_primary: false }
            ]
          }
        ]
      },
    // Add more products here with the same structure...
  ];
  
  module.exports = { mockProducts };
  