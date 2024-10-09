-- Create Categories table
CREATE TABLE Categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Create Products table
CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INT,
    brand VARCHAR(100),
    FOREIGN KEY (category_id) REFERENCES Categories(id)
);

-- Create Product_SKUs table with additional attributes
CREATE TABLE Product_SKUs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    sku VARCHAR(100) UNIQUE,
    price DECIMAL(10, 2),
    stock INT,
    color VARCHAR(50),  -- Each SKU corresponds to a specific color
    size VARCHAR(50),   -- If applicable
    wattage DECIMAL(5, 2),  -- New attribute for wattage
    voltage DECIMAL(5, 2),   -- New attribute for voltage
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

-- Create Product_Images table
CREATE TABLE Product_Images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sku_id INT,  -- Link images to specific SKUs
    image_path VARCHAR(255),
    is_primary BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (sku_id) REFERENCES Product_SKUs(id)
);
