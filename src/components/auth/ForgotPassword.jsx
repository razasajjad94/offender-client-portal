import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../../services/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      toast.success('Password reset link sent to your email');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Recover your password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            required
          />
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Sending...' : 'Continue'}
        </button>
        <Link to="/login" className="btn btn-secondary">
          Cancel
        </Link>
      </form>
      <div className="auth-footer">
        <p>
          Didn't receive code? <Link to="/forgot-password">click here</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;