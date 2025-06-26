import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import subscriptionService from '../../services/subscription';


const UsageStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await subscriptionService.getUsageStats();
        setStats(data);
      } catch (error) {
        toast.error(error.message || 'Failed to fetch usage stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Loading usage statistics...</div>;
  if (!stats) return <div>No usage data available</div>;

  const usagePercentage = Math.round((stats.usage / stats.limit) * 100);

  return (
    <div className="dashboard-card">
      <h2>Your Subscription</h2>
      
      <div className="subscription-info">
        <h3>{stats.planName}</h3>
        {/* <p>Monthly API Limit: {stats.limit.toLocaleString()}</p> */}
        <p>Status: <span className="badge active">Active</span></p>
        <p>Current billing cycle: {stats.billingCycle}</p>
      </div>
      
      <div className="api-usage">
        <h3>API Usage</h3>
        <div className="usage-bar">
          <div 
            className="usage-progress" 
            style={{ width: `${usagePercentage}%` }}
            aria-valuenow={usagePercentage}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        {/* <p>
          {stats.usage.toLocaleString()} / {stats.limit.toLocaleString()} ({usagePercentage}%)
        </p> */}
        <p className="reset-info">Resets in {stats.daysUntilReset} days</p>
      </div>
      
      {/* <div className="quick-links">
        <h3>Quick Selection Links</h3>
        <div className="links-grid">
          <a href="/dashboard/api-access" className="quick-link">
            <span>API Access</span>
          </a>
          <a href="/documentation" className="quick-link">
            <span>Documentation</span>
          </a>
          <a href="/subscription" className="quick-link">
            <span>Upgrade Plan</span>
          </a>
          <a href="/profile" className="quick-link">
            <span>Profile Settings</span>
          </a>
        </div>
      </div> */}
    </div>
  );
};

export default UsageStats;