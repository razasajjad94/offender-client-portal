import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <div className="hero">
        <h1>Offender Search Application</h1>
        <p>Access comprehensive offender data with our secure API</p>
        {user ? (
          <Link to="/dashboard" className="btn-1">
            Go to Dashboard
          </Link>
        ) : (
          <div className="auth-actions">
            <Link to="/login" className="btn-1">
              Login
            </Link>
            <Link to="/register" className="btn-1 btn-secondary">
              Register
            </Link>
          </div>
        )}
      </div>
      
      <div className="features">
        <div className="feature">
          <h3>Secure API Access</h3>
          <p>Access offender data through our secure REST API with token authentication.</p>
        </div>
        <div className="feature">
          <h3>Flexible Subscriptions</h3>
          <p>Choose from multiple subscription plans to fit your usage needs.</p>
        </div>
        <div className="feature">
          <h3>Comprehensive Documentation</h3>
          <p>Detailed API documentation makes integration simple and straightforward.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;