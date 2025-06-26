import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./components/auth/Login'));
const Register = lazy(() => import('./components/auth/Register'));
const ForgotPassword = lazy(() => import('./components/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./components/auth/ResetPassword'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Documentation = lazy(() => import('./pages/Documentation'));
const Profile = lazy(() => import('./components/profile/Profile'));
const Subscription = lazy(() => import('./components/dashboard/Subscription'));
const ApiAccess = lazy(() => import('./components/dashboard/ApiAccess'));
const UsageStats = lazy(() => import('./components/dashboard/UsageStats'));
const NotFound = lazy(() => import('./pages/NotFound'));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<UsageStats />} />
          <Route path="api-access" element={<ApiAccess />} />
          <Route path="subscription" element={<Subscription />} />
        </Route>
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};