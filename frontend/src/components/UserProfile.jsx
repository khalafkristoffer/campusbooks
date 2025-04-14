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
  const { setSellerMode, user } = useAuth();

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
      alert('Boken har tagits bort');
      refetch();
    } catch (error) {
      setDeleteInProgress(null);
      console.error('Error deleting book:', error);
      alert('Kunde inte ta bort boken');
    }
  };

  const handleGoToSell = () => {
    setSellerMode(true);
    navigate('/');
  };

  if (isLoading) return <div className="loading-container"><div className="loading">Laddar dina böcker...</div></div>;
  if (error) return <div className="error-container"><div className="error">Fel vid laddning av böcker: {error.message}</div></div>;

  return (
    <div className="user-profile-container">
      <div className="user-profile-header">
        <h1>Mina böcker</h1>
        <Button onClick={handleGoToSell} className="button-primary add-book-button">
          Lägg upp bokannons
        </Button>
      </div>
      
      {myBooks && myBooks.length === 0 ? (
        <div className="no-books">
          <p>Du har inte lagt upp någon bokannons</p>
          <Button onClick={handleGoToSell} className="button-primary">
            Lägg upp din första bokannons
          </Button>
        </div>
      ) : (
        <div className="book-grid">
          {myBooks.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-image">
                <img src={book.image_url || '/assets/book-placeholder.png'} alt={book.title} />
              </div>
              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="book-course">{book.course_code}</p>
                <p className="book-price">{book.price} kr</p>
                <div className="book-actions">
                  <Link to={`/books/id/${book.id}`} className="view-link">Visa</Link>
                  <button
                    onClick={() => handleDeleteBook(book.id)}
                    className="delete-button"
                    disabled={deleteInProgress === book.id}
                  >
                    {deleteInProgress === book.id ? (
                      <>
                        <span className="spinner" style={{ 
                          borderColor: 'rgba(255, 255, 255, 0.3)', 
                          borderTopColor: 'white',
                          width: '16px',
                          height: '16px'
                        }}></span>
                        Tar bort...
                      </>
                    ) : 'Ta bort'}
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
