// Test script for the Travel Buddy API
const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testAPI() {
  console.log('🧪 Testing Travel Buddy API...\n');

  try {
    // Test 1: Check server health
    console.log('1. Testing server health...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check:', healthResponse.data);
    console.log('');

    // Test 2: Register a new user
    console.log('2. Testing user registration...');
    const registerData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };

    try {
      const registerResponse = await axios.post(`${BASE_URL}/travel_buddy/register`, registerData);
      console.log('✅ Registration successful:', registerResponse.data);
      console.log('');
    } catch (error) {
      console.log('ℹ️  Registration response:', error.response?.data || error.message);
      console.log('');
    }

    // Test 3: Login with the user
    console.log('3. Testing user login...');
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };

    const loginResponse = await axios.post(`${BASE_URL}/travel_buddy/login`, loginData);
    console.log('✅ Login successful:', loginResponse.data);
    
    const token = loginResponse.data.token;
    console.log('🔑 Token received for further requests\n');

    // Test 4: Access protected profile route
    console.log('4. Testing protected profile route...');
    const profileResponse = await axios.get(`${BASE_URL}/travel_buddy/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Profile access successful:', profileResponse.data);
    console.log('');

    // Test 5: Access dashboard route
    console.log('5. Testing dashboard route...');
    const dashboardResponse = await axios.get(`${BASE_URL}/travel_buddy/dashboard`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Dashboard access successful:', dashboardResponse.data);
    console.log('');

    // Test 6: Test invalid token
    console.log('6. Testing invalid token...');
    try {
      await axios.get(`${BASE_URL}/travel_buddy/profile`, {
        headers: {
          'Authorization': 'Bearer invalid-token'
        }
      });
    } catch (error) {
      console.log('✅ Invalid token correctly rejected:', error.response?.data);
    }

    console.log('\n🎉 All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = testAPI;
