import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import authService from '../../services/auth';

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authService.getUserProfile();
        setProfile(data);
      } catch (error) {
        setError(error.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await authService.updateProfile(profile);
      setSuccess('Profile updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message || 'Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    setUpdating(true);
    try {
      await authService.changePassword({
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword
      });
      setSuccess('Password changed successfully');
      setPasswordForm({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message || 'Failed to change password');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
      
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      
      <section className="personal-info">
        <h2>Personal Information</h2>
        <form onSubmit={handleProfileSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input 
              type="text" 
              name="firstName" 
              value={profile.firstName} 
              onChange={handleProfileChange} 
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input 
              type="text" 
              name="lastName" 
              value={profile.lastName} 
              onChange={handleProfileChange} 
              required
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={profile.email} 
              onChange={handleProfileChange} 
              disabled
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input 
              type="tel" 
              name="phone" 
              value={profile.phone} 
              onChange={handleProfileChange} 
            />
          </div>
          <button type="submit" className="btn" disabled={updating}>
            {updating ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </section>
      
      <section className="password-change">
        <h2>Change Password</h2>
        <form onSubmit={handlePasswordSubmit}>
          <div className="form-group">
            <label>Old Password</label>
            <input 
              type="password" 
              name="oldPassword" 
              value={passwordForm.oldPassword} 
              onChange={handlePasswordChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input 
              type="password" 
              name="newPassword" 
              value={passwordForm.newPassword} 
              onChange={handlePasswordChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input 
              type="password" 
              name="confirmPassword" 
              value={passwordForm.confirmPassword} 
              onChange={handlePasswordChange} 
              required 
            />
          </div>
          <button type="submit" className="btn" disabled={updating}>
            {updating ? 'Updating...' : 'Change Password'}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Profile;