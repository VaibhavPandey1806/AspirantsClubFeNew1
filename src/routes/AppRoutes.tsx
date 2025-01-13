import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage';
import QuestionForm from '../components/QuestionForm';
import QuestionBank from '../pages/QuestionBank';
import QuestionList from '../pages/QuestionList';
import QuestionDetail from '../pages/QuestionDetail';
import Profile from '../pages/Profile';
import UserResponses from '../pages/UserResponses';
import AboutUs from '../pages/AboutUs';
import AdminDashboard from '../pages/admin/AdminDashboard';
import Forum from '../pages/Forum';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';

interface AppRoutesProps {
  isLoggedIn: boolean;
  userRole?: string;
}

export default function AppRoutes({ isLoggedIn, userRole }: AppRoutesProps) {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route path="/submit-question" element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <QuestionForm />
        </PrivateRoute>
      } />
      <Route path="/question-bank" element={<QuestionBank />} />
      <Route path="/questions" element={<QuestionList />} />
      <Route path="/questions/:id" element={<QuestionDetail />} />
      <Route path="/profile" element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <Profile />
        </PrivateRoute>
      } />
      <Route path="/responses" element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <UserResponses />
        </PrivateRoute>
      } />

      {/* Forum Routes */}
      <Route path="/forum/*" element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <Forum />
        </PrivateRoute>
      } />

      {/* Admin Routes */}
      <Route path="/admin" element={
        <AdminRoute isLoggedIn={isLoggedIn} isAdmin={userRole === 'ADMIN'}>
          <AdminDashboard />
        </AdminRoute>
      } />
    </Routes>
  );
}