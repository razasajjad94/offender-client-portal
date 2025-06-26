import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import subscriptionService from '../../services/subscription';
import SubscriptionForm from './SubscriptionForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Subscription = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await subscriptionService.getSubscriptionPlans();
        setPlans(data);
      } catch (error) {
        toast.error(error.message || 'Failed to fetch subscription plans');
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  if (loading) return <div>Loading subscription plans...</div>;

  return (
    <div className="dashboard-card">
      <h2>Subscription Plans</h2>
      <p>Find the right plan that fits your API usage needs.</p>
      
      <Elements stripe={stripePromise}>
        <SubscriptionForm plans={plans} />
      </Elements>
    </div>
  );
};

export default Subscription;