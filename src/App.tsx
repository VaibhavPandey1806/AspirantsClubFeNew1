import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './components/HomePage';
import QuestionForm from './components/QuestionForm';
import QuestionBank from './pages/QuestionBank';
import QuestionList from './pages/QuestionList';
import QuestionDetail from './pages/QuestionDetail';
import Profile from './pages/Profile';
import UserResponses from './pages/UserResponses';
import AboutUs from './pages/AboutUs';
import AdminDashboard from './pages/admin/AdminDashboard';
import { checkLoginStatus, getUserDetails } from './utils/api';
import type { User } from './types/user';
import SubmittedQuestions from './pages/SubmittedQuestions';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Footer from './components/Footer/Footer';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const { data: loginStatus } = await checkLoginStatus();
        setIsLoggedIn(loginStatus);

        if (loginStatus) {
          const { data: userDetails } = await getUserDetails();
          setUserData(userDetails);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
        setUserData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoginStatus();
  }, []);

  const handleLogout = () => {
    window.location.href = '/logout'; // Redirect to backend logout endpoint
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  const isAdmin = userData?.role?.toUpperCase() === 'ADMIN';

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        isLoggedIn={isLoggedIn}
        userName={userData?.name}
        isAdmin={isAdmin}
        onLogout={handleLogout}
      />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route path="/" element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <HomePage />
            </PrivateRoute>
          } />
          
          <Route path="/submit-question" element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <QuestionForm />
            </PrivateRoute>
          } />
          
          <Route path="/question-bank" element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <QuestionBank />
            </PrivateRoute>
          } />
          
          <Route path="/questions" element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <QuestionList />
            </PrivateRoute>
          } />
          
          <Route path="/questions/:id" element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <QuestionDetail />
            </PrivateRoute>
          } />
          
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
          
          <Route path="/submitted-questions" element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <SubmittedQuestions />
            </PrivateRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <AdminRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
              <AdminDashboard />
            </AdminRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}