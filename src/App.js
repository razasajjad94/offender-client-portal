import { Suspense } from 'react';
import { useAuth } from './context/AuthContext';
import { AppRoutes } from './routes';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <div className="full-page-loading"><LoadingSpinner /></div>;
  }

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <AppRoutes /> {/* Removed outer Suspense */}
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default App;