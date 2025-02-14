import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route, HashRouter } from "react-router";
import { UserProvider } from './lib/context/user';
import { BooksProvider } from "./lib/context/books";
import './index.css'
import App from './App.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import NotFound from './Pages/NotFound.jsx';
import BookDetails from './Pages/BookDetails.jsx';
import Profile from './Pages/Profile.jsx';
import Admin from './admin/Admin.jsx';
import AllUsers from './admin/Pages/AllUsers.jsx';
import AdminLayout from './admin/AdminLayout.jsx';
import AllBooks from './admin/Pages/AllBooks.jsx';
import AccRequests from './admin/Pages/AccRequests.jsx';
import ProtectedAdminRoute from './routes/ProtectedAdminRoute.jsx';
import CreateBook from './admin/Pages/CreateBook.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <BooksProvider>
        <HashRouter>
          <Routes>
            <Route index element={<App />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="admin" element={<ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>}>
              <Route index element={<ProtectedAdminRoute><Admin /></ProtectedAdminRoute>} />
              <Route path="users" element={<ProtectedAdminRoute><AllUsers /></ProtectedAdminRoute>} />
              <Route path="books" element={<ProtectedAdminRoute><AllBooks /></ProtectedAdminRoute>} />
              <Route path="requests" element={<ProtectedAdminRoute><AccRequests /></ProtectedAdminRoute>} />
              <Route path="create" element={<ProtectedAdminRoute><CreateBook /></ProtectedAdminRoute>} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </HashRouter>
      </BooksProvider>
    </UserProvider>
  </StrictMode>,
)
