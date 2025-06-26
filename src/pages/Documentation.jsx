import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import apiService from '../services/api';

const Documentation = () => {
  const [docs, setDocs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const data = await apiService.getApiDocumentation();
        setDocs(data);
      } catch (error) {
        toast.error(error.message || 'Failed to load documentation');
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, []);

  if (loading) return <div>Loading documentation...</div>;
  if (!docs) return <div>Documentation not available</div>;

  return (
    <div className="documentation-container">
      <h1>API Documentation</h1>
      
      <section className="authentication">
        <h2>Authentication</h2>
        <p>All API requests must include your API token in the Authorization header:</p>
        <pre>Authorization: Bearer YOUR_ACCESS_TOKEN</pre>
        
        <h3>Example Request (cURL)</h3>
        <pre>
          {`curl -X GET "https://api.offendersearch.com/v1/offenders/search?state=CA" \\\n  -H "Authorization: Bearer sk_live_2flxa83mNsh..4Wq8"`}
        </pre>
      </section>
      
      {/* <section className="endpoints">
        <h2>API Endpoints</h2>
        
        <div className="endpoint">
          <h3>Get Tracking Numbers</h3>
          <p><strong>Endpoint:</strong> POST /get-trackingmr</p>
          
          <h4>Request Body</h4>
          <pre>
            {JSON.stringify(docs.endpoints.getTracking.requestBody, null, 2)}
          </pre>
          
          <h4>Success Response</h4>
          <pre>
            {JSON.stringify(docs.endpoints.getTracking.successResponse, null, 2)}
          </pre>
          
          <h4>Error Response</h4>
          <pre>
            {JSON.stringify(docs.endpoints.getTracking.errorResponse, null, 2)}
          </pre>
        </div>
      </section> */}
      
      {/* <section className="error-codes">
        <h2>Error Codes</h2>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Description</th>
              <th>Resolution</th>
            </tr>
          </thead>
          <tbody>
            {docs.errorCodes.map((error, index) => (
              <tr key={index}>
                <td>{error.code}</td>
                <td>{error.description}</td>
                <td>{error.resolution}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section> */}
    </div>
  );
};

export default Documentation;