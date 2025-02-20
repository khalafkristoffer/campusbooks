import apiClient from './client';

export const getAllBooks = async () => {
  try {
    const response = await apiClient.get('/books');
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

// Add other API functions here (e.g., addBook, deleteBook)
