const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

const testAPI = async () => {
  try {
    console.log('🧪 Testing Book Review API...\n');

    // Test 1: Create a book
    console.log('1. Creating a book...');
    const bookResponse = await axios.post(`${BASE_URL}/books`, {
      title: 'Test Book',
      author: 'Test Author',
      description: 'A test book for API testing',
      publishedYear: 2024
    });
    const bookId = bookResponse.data.data._id;
    console.log('✅ Book created:', bookId);

    // Test 2: Get all books
    console.log('\n2. Getting all books...');
    const booksResponse = await axios.get(`${BASE_URL}/books`);
    console.log('✅ Books retrieved:', booksResponse.data.count);

    // Test 3: Get single book
    console.log('\n3. Getting single book...');
    const singleBookResponse = await axios.get(`${BASE_URL}/books/${bookId}`);
    console.log('✅ Single book retrieved:', singleBookResponse.data.data.title);

    // Test 4: Add a review
    console.log('\n4. Adding a review...');
    const reviewResponse = await axios.post(`${BASE_URL}/books/${bookId}/reviews`, {
      reviewerName: 'Test Reviewer',
      rating: 5,
      comment: 'This is a test review'
    });
    console.log('✅ Review added:', reviewResponse.data.data._id);

    // Test 5: Get reviews for book
    console.log('\n5. Getting reviews for book...');
    const reviewsResponse = await axios.get(`${BASE_URL}/books/${bookId}/reviews`);
    console.log('✅ Reviews retrieved:', reviewsResponse.data.count);

    // Test 6: Search books
    console.log('\n6. Searching books...');
    const searchResponse = await axios.get(`${BASE_URL}/books?search=test`);
    console.log('✅ Search results:', searchResponse.data.count);

    // Test 7: Sort by rating
    console.log('\n7. Sorting by rating...');
    const sortResponse = await axios.get(`${BASE_URL}/books?sort=rating`);
    console.log('✅ Sorted books:', sortResponse.data.count);

    console.log('\n🎉 All tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
};

testAPI();