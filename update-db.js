const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

// Function to fetch car images based on brand from Unsplash
async function fetchCarImageByBrand(brand) {
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {query: brand, per_page: 1}, // Query the brand and limit to 1 image
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
    console.error(`Error fetching image for brand ${brand}:`, error);
    return null;
  }
}

// Update db.json with customized Unsplash images based on car brand (with caching)
async function updateDbJson() {
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
    db = {cars: []}; // Default to an empty list of cars if the file is invalid
  }

  // Cars array (no types needed)
  const cars = db.cars;

  const brandCache = {};

  // Iterate over each car and fetch an image based on the car's brand
  for (let car of cars) {
    // If the brand is already cached, use the cached URL
    if (!brandCache[car.brand]) {
      const imageUrl = await fetchCarImageByBrand(car.brand);
      brandCache[car.brand] = imageUrl || 'http://default-image-url.com';
    }
    car.photoUrl = brandCache[car.brand]; // Assign cached URL
  }

  // Write the updated data back to db.json
  fs.writeFileSync('./db.json', JSON.stringify({cars}, null, 2), 'utf-8');

  console.log('db.json successfully updated with Unsplash images!');
}

// Run the update
updateDbJson().catch(error => console.error('Error updating db.json:', error));

// Export the functions for testing
module.exports = {fetchCarImageByBrand, updateDbJson};
