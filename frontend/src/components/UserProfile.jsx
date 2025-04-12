import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import apiClient from '../api/client';
import Button from './Button';
import '../styles/user-profile.css';

const UserProfile = () => {
  const [deleteInProgress, setDeleteInProgress] = useState(null);
  
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
      // Show success feedback
      alert('Book deleted successfully');
      refetch(); // Refresh the list
    } catch (error) {
      setDeleteInProgress(null);
      console.error('Error deleting book:', error);
      alert('Failed to delete book');
    }
  };

  if (isLoading) return <div className="loading">Loading your books...</div>;
  
  if (error) return <div className="error">Error loading your books: {error.message}</div>;

  return (
    <div className="user-profile">
      <h2>My Books</h2>
      
      {myBooks && myBooks.length === 0 ? (
        <div className="no-books">
          <p>You haven't posted any books yet.</p>
          <Button className="button-primary">
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Post a Book
            </Link>
          </Button>
        </div>
      ) : (
        <div className="my-books-list">
          {myBooks.map((book) => (
            <div key={book.id} className="my-book-card">
              <div className="book-image">
                {book.image_url && <img src={book.image_url} alt={book.title} />}
              </div>
              <div className="book-info">
                <h3>{book.title}</h3>
                <p><strong>Course:</strong> {book.course_code}</p>
                <p><strong>Price:</strong> {book.price} kr</p>
                <p><strong>Condition:</strong> {book.condition}</p>
                <p><strong>Location:</strong> {book.location}</p>
                {book.phone_number && (
                  <p className="phone-number">
                    <span className="phone-number-icon">📱</span>
                    <span>{book.phone_number}</span>
                  </p>
                )}
                <div className="book-actions">
                  <Link to={`/books/id/${book.id}`} className="view-link">View Details</Link>
                  <button 
                    onClick={() => handleDeleteBook(book.id)}
                    className="delete-button"
                    disabled={deleteInProgress === book.id}
                  >
                    {deleteInProgress === book.id ? (
                      <>Deleting<span className="loading-spinner"></span></>
                    ) : (
                      'Delete'
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
