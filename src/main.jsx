import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { UserProvider } from './lib/context/user';
import { BooksProvider } from "./lib/context/books";
import './index.css'
import App from './App.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import NotFound from './Pages/NotFound.jsx';
import BookDetails from './Pages/BookDetails.jsx';
import Profile from './Pages/Profile.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <BooksProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<App />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </BooksProvider>
    </UserProvider>
  </StrictMode>,
)
