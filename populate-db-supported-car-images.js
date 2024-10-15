const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

// Function to fetch car brand or model images from Unsplash
async function fetchImage(query) {
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {query, per_page: 1}, // Query with brand or model name and limit to 1 image
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    // Get the medium size image URL if available
    const imageUrl =
      response.data.results.length > 0
        ? response.data.results[0].urls.regular
        : null;
    return imageUrl;
  } catch (error) {
    console.error(`Error fetching image for query ${query}:`, error);
    return null;
  }
}

// Update db.json but only affect the "supportedCarBrandsAndModels" array
async function updateSupportedCarBrandsAndModels() {
  // Load the existing db.json file
  let db;
  try {
    const data = fs.readFileSync('./db.json', 'utf-8');
    if (!data || data.trim() === '') {
      throw new Error('db.json file is empty or undefined');
    }
    db = JSON.parse(data);
  } catch (error) {
    console.error('Error parsing db.json:', error);
    return;
  }

  // Extract the supportedCarBrandsAndModels array, leaving other data intact
  const carBrands = db.supportedCarBrandsAndModels || [];

  const brandCache = {};
  const modelCache = {};

  // Iterate over each brand and model to fetch images
  for (let brandObj of carBrands) {
    const brand = brandObj.brand;

    // Fetch brand image only if it still contains 'default' in the URL
    if (!brandObj.brandImage || brandObj.brandImage.includes('default')) {
      if (!brandCache[brand]) {
        const brandImageUrl = await fetchImage(brand);
        brandCache[brand] =
          brandImageUrl || 'http://default-brand-image-url.com';
      }
      brandObj.brandImage = brandCache[brand]; // Assign cached brand image
    }

    // Iterate over each model under the brand
    for (let modelObj of brandObj.models) {
      const model = modelObj.name || modelObj; // Handles both "string" and "object" model types

      // Fetch model image only if it still contains 'default' in the URL
      if (
        (typeof modelObj === 'object' &&
          modelObj.image &&
          modelObj.image.includes('default')) ||
        (typeof modelObj === 'string' && !modelCache[`${brand}_${model}`])
      ) {
        const modelImageUrl = await fetchImage(`${brand} ${model}`);
        modelCache[`${brand}_${model}`] =
          modelImageUrl || 'http://default-model-image-url.com';

        // Update model image
        if (typeof modelObj === 'string') {
          // If models are plain strings, convert them to objects
          const index = brandObj.models.indexOf(modelObj);
          brandObj.models[index] = {
            name: model,
            image: modelCache[`${brand}_${model}`],
          };
        } else {
          // If models are already objects
          modelObj.image = modelCache[`${brand}_${model}`];
        }
      }
    }
  }

  // Only update the "supportedCarBrandsAndModels" array and leave other data intact
  db.supportedCarBrandsAndModels = carBrands;

  // Write the updated data back to db.json
  fs.writeFileSync('./db.json', JSON.stringify(db, null, 2), 'utf-8');

  console.log(
    'db.json successfully updated with Unsplash images for supportedCarBrandsAndModels!',
  );
}

// Run the update
updateSupportedCarBrandsAndModels().catch(error =>
  console.error('Error updating db.json:', error),
);
