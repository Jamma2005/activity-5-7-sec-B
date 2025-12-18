const axios = require('axios');

// Base URL of your running server
const API_URL = 'http://localhost:1234';

/*
======================================================================
  ACTIVITY 1: BASIC API FETCHING
======================================================================
*/

/**
 * Fetches all users and all products from the API.
 */
async function fetchAllData() {
    console.log('--- [Activity 1: Fetching All Data] ---');
    try {
        // Fetch all users
        const usersResponse = await axios.get(`${API_URL}/users`);
        console.log('Success: Fetched /users');
        console.log('User Data:', usersResponse.data);
        console.log('');

        // Fetch all products
        const productsResponse = await axios.get(`${API_URL}/products`);
        console.log('Success: Fetched /products');
        console.log('Product Data:', productsResponse.data);

    } catch (error) {
        console.error('Error in fetchAllData:', error.message);
    }
}

/*
======================================================================
  ACTIVITY 2: ERROR HANDLING
======================================================================
*/

/**
 * Tests error handling using an invalid endpoint.
 */
async function testErrorHandling() {
    console.log('\n--- [Activity 2: Error Handling] ---');

    try {
        await axios.get(`${API_URL}/invalid-endpoint`);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log('Success: 404 error handled correctly');
        } else {
            console.error('Unexpected error:', error.message);
        }
    }
}

/*
======================================================================
  MAIN FUNCTION
======================================================================
*/

async function main() {
    // Make sure the server is running first
    await fetchAllData();
    await testErrorHandling();
}

// Run program
main();
