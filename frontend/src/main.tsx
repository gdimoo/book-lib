import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import BookForm from './pages/BookForm';
import { AuthProvider, useAuth } from './state/auth';

function Private({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  return token ? <>{children}</> : <Navigate to="/login" replace />;
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Private><Books /></Private>} />
          <Route path="/books/new" element={<Private><BookForm /></Private>} />
          <Route path="/books/:id" element={<Private><BookDetail /></Private>} />
          <Route path="/books/:id/edit" element={<Private><BookForm /></Private>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
