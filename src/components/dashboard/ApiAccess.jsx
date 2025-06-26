import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import apiService from '../../services/api';

const ApiAccess = () => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const data = await apiService.getApiToken();
        setToken(data.token);
      } catch (error) {
        toast.error(error.message || 'Failed to fetch API token');
      } finally {
        setLoading(false);
      }
    };
    fetchToken();
  }, []);

  const handleRegenerate = async () => {
    if (!window.confirm('Are you sure you want to regenerate your API token?')) return;
    try {
      setLoading(true);
      const data = await apiService.regenerateToken();
      setToken(data.token);
      toast.success('API token regenerated successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to regenerate token');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !token) return <div>Loading API token...</div>;

  return (
    <div className="dashboard-card">
      <h2>API Access Token</h2>
      <div className="token-display">
        <p>Your API Key:</p>
        <div className="token-box">
          <code>{token}</code>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(token);
              toast.success('Copied to clipboard');
            }}
            className="btn btn-secondary"
          >
            Copy
          </button>
        </div>
      </div>

      <div className="api-docs">
        <h3>Get Tracking numbers shipped inside of the USA</h3>
        <div className="endpoint">
          <p>API Endpoint:</p>
          <code>POST https://titnogab4k.execute-api.us-east-lamazonews.com/prod/get-trackingmr</code>
        </div>
        
        <div className="request-body">
          <h4>Request Body:</h4>
          <pre>
            {JSON.stringify({
              city: 'string (optional)',
              state: 'string (2-character state code)',
              from: 'number (timestamp)',
              to: 'number (timestamp)',
              checkOnWalmart: 'boolean (optional)',
              allowPhoto: 'boolean (optional, default: false)',
              allowSignature: 'boolean (optional, default: false)',
              enableDoubleCheck: 'boolean (optional, default: true)'
            }, null, 2)}
          </pre>
        </div>
      </div>

      <button onClick={handleRegenerate} className="btn btn-danger" disabled={loading}>
        {loading ? 'Regenerating...' : 'Regenerate Token'}
      </button>

      <div className="security-notes">
        <h4>Security Notes:</h4>
        <ul>
          <li>Treat your access token like a password. Keep it confidential.</li>
          <li>Do not expose it in public code or repositories.</li>
          <li>If compromised, regenerate it immediately.</li>
        </ul>
      </div>
    </div>
  );
};

export default ApiAccess;