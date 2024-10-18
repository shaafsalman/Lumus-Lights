const pool = require('../db');

// Helper function for query execution (returns a Promise)
const executeQuery = (query, params) => {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (err, results) => {
      if (err) {
        return reject(new Error(err.message));
      }
      resolve(results);
    });
  });
};

const formatDate = (date) => {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

// Fetch all promotional images
const fetchPromotionalImages = async () => {
  const query = `
    SELECT 
      imageID , 
      imageUrl, 
      name,          
      active, 
      createdAt, 
      updatedAt
    FROM PromotionalImages;
  `;

  try {
    const results = await executeQuery(query, []);
    
    // Format the dates for each image
    const formattedResults = results.map(image => ({
      ...image,
      createdAt: formatDate(new Date(image.createdAt)),
      updatedAt: formatDate(new Date(image.updatedAt)),
    }));

    return formattedResults;
  } catch (error) {
    console.error('Error fetching promotional images:', error);
    throw error;
  }
};

/// Activate or deactivate promotional image
const activateDeactivatePromotionalImage = async (imageID, active) => {
  const query = `
    UPDATE PromotionalImages 
    SET Active = ? 
    WHERE ImageID = ?;
  `;

  try {
    // Toggle the active status
    const result = await executeQuery(query, [active ? 0 : 1, imageID]);
    return result.affectedRows;
  } catch (error) {
    console.error('Error updating promotional image status:', error);
    throw error;
  }
};



// Delete a promotional image by ImageID
const deletePromotionalImage = async (imageID) => {
  const query = `
    DELETE FROM PromotionalImages 
    WHERE ImageID = ?;
  `;

  try {
    const result = await executeQuery(query, [imageID]);
    return result.affectedRows;
  } catch (error) {
    console.error('Error deleting promotional image:', error);
    throw error;
  }
};

// Add a promotional image
const addPromotionalImage = async ({ imageUrl, active, name }) => { // Include name in the parameters
  const query = `
    INSERT INTO PromotionalImages (ImageUrl, Active, Name) 
    VALUES (?, ?, ?);
  `;

  try {
    const result = await executeQuery(query, [imageUrl, active, name]); // Pass name to the query
    return result.insertId; // Return the ID of the newly inserted image
  } catch (error) {
    console.error('Error adding promotional image:', error);
    throw error;
  }
};

module.exports = {
  fetchPromotionalImages,
  activateDeactivatePromotionalImage,
  deletePromotionalImage,
  addPromotionalImage,
};
