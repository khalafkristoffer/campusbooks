import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../api/client';
import Button from './Button';
import '../styles/user-profile.css';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
  const [deleteInProgress, setDeleteInProgress] = useState(null);
  const navigate = useNavigate();
  const { setSellerMode } = useAuth();

  const { isLoading, error, data: myBooks, refetch } = useQuery({
    queryKey: ['myBooks'],
    queryFn: async () => {
      const response = await apiClient.get('/my-books/');
      return response.data;
    }
  });

  const handleDeleteBook = async (bookId) => {
    try {
      setDeleteInProgress(bookId);
      await apiClient.delete(`/books/${bookId}`);
      setDeleteInProgress(null);
      alert('Book deleted successfully');
      refetch();
    } catch (error) {
      setDeleteInProgress(null);
      console.error('Error deleting book:', error);
      alert('Failed to delete book');
    }
  };

  const handleGoToSell = () => {
    setSellerMode(true);
    navigate('/');
  };

  if (isLoading) return <div className="loading">Loading your books...</div>;
  if (error) return <div className="error">Error loading your books: {error.message}</div>;

  return (
    <div className="user-profile">
      <h2>My Books</h2>
      {myBooks && myBooks.length === 0 ? (
        <div className="no-books">
          <p>You haven't posted any books yet.</p>
          <Button onClick={handleGoToSell} className="button-primary">
            Post a Book
          </Button>
        </div>
      ) : (
        <div className="my-books-list">
          {myBooks.map((book) => (
            <div key={book.id} className="my-book-card">
              <img src={book.image_url || 'default-placeholder.png'} alt={book.title} className="my-book-image" />
              <div className="my-book-info">
                <h4>{book.title}</h4>
                <p>{book.course_code} - {book.price} kr</p>
              </div>
              <div className="book-actions">
                <Link to={`/books/id/${book.id}`} className="view-link">View</Link>
                <button
                  onClick={() => handleDeleteBook(book.id)}
                  className="delete-button"
                  disabled={deleteInProgress === book.id}
                >
                  {deleteInProgress === book.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
          <div className="add-more-books">
            <Button onClick={handleGoToSell} className="button-secondary">
              Post Another Book
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
