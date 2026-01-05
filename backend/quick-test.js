#!/usr/bin/env node

const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

const log = (color, message) => console.log(`${colors[color]}${message}${colors.reset}`);

const quickTest = async () => {
  try {
    log('blue', '🚀 Quick API Test Starting...\n');

    // Health check
    log('yellow', '1. Health Check...');
    await axios.get('http://localhost:5000/health');
    log('green', '✅ Server is running\n');

    // Get books
    log('yellow', '2. Getting books...');
    const response = await axios.get(`${BASE_URL}/books`);
    log('green', `✅ Found ${response.data.count} books\n`);

    if (response.data.count > 0) {
      const book = response.data.data[0];
      log('blue', `📚 Sample Book: "${book.title}" by ${book.author}`);
      log('blue', `⭐ Rating: ${book.avgRating}/5 (${book.reviewCount} reviews)\n`);
    }

    // Test search
    log('yellow', '3. Testing search...');
    const searchResponse = await axios.get(`${BASE_URL}/books?search=great`);
    log('green', `✅ Search returned ${searchResponse.data.count} results\n`);

    log('green', '🎉 All tests passed! Your API is working perfectly.');
    log('blue', '\n📍 Frontend: http://localhost:5173');
    log('blue', '📍 Backend: http://localhost:5000');

  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      log('red', '❌ Server not running! Please start with: npm run dev');
    } else {
      log('red', `❌ Error: ${error.response?.data?.message || error.message}`);
    }
  }
};

quickTest();