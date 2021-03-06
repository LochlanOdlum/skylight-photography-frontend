import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import PhotoDetailsPage from './pages/PhotoDetailsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PaymentPage from './pages/PaymentPage';
import OrderCompletePage from './pages/OrderCompletePage';
import MyPhotosPage from './pages/MyPhotosPage';
import MyAccountPage from './pages/MyAccountPage';

import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminPhotoPage from './pages/AdminPhotoPage';
import AdminCollectionsPage from './pages/AdminCollectionsPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import AdminUsersPage from './pages/AdminUsersPage';

import './app.css';

const STRIPE_PUBLISHABLE_KEY =
  'pk_test_51JmjyLBxc7UTHklpkl2msXfRPXO5UmEfW2b33xIk4S0y5Pc9oKObZibwotF3S626UWjGdGFQSJ7JGRZfVIwITrt800sVddKcVx';

const API_URL = 'https://skylight-photography.herokuapp.com/';

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

//TODO: Route back to original route once logged in
const ProtectedLoginRoute = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <LoginPage />;
};

const ProtectedAdminLoginRoutes = () => {
  const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);
  if (!isLoggedIn) {
    return <AdminLoginPage />;
  }

  if (!isAdmin) {
    return <Navigate to='/' />;
  }

  return <Outlet />;
};

const App = () => {
  //Wake up backend server if it's asleep
  useEffect(() => {
    fetch(`${API_URL}ping`);
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/photo/:id' element={<PhotoDetailsPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />

          {/* Routes requiring user to be logged in */}
          <Route path='/' element={<ProtectedLoginRoute />}>
            <Route path='/myPhotos' element={<MyPhotosPage />} />
            <Route path='/checkout' element={<PaymentPage />} />
            <Route path='/myaccount' element={<MyAccountPage />} />
            <Route path='/order/success/:orderId' element={<OrderCompletePage />} />
          </Route>
          {/* Admin restricted Routes  */}
          <Route path='/admin/login' element={<AdminLoginPage />} />
          <Route path='/admin' element={<ProtectedAdminLoginRoutes />}>
            <Route path='/admin' element={<AdminDashboardPage />} />
            <Route path='/admin/photos' element={<AdminPhotoPage />} />
            <Route path='/admin/collections' element={<AdminCollectionsPage />} />
            <Route path='/admin/orders' element={<AdminOrdersPage />} />
            <Route path='/admin/users' element={<AdminUsersPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Elements>
  );
};

export default App;
