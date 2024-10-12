const fs = require('fs');
const path = require('path');

// Import default data from db.default.json
const defaultData = require('./db.default.json');

// Function to reset db.json with default data
function resetDbJson() {
  try {
    fs.writeFileSync(
      path.join(__dirname, 'db.json'), // Use absolute path
      JSON.stringify(defaultData, null, 2),
      'utf-8',
    );
    console.log('db.json has been reset to default data!');
  } catch (error) {
    console.error('Error resetting db.json:', error);
  }
}

// Run the reset
resetDbJson();
