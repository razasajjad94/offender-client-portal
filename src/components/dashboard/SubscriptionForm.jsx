import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import subscriptionService from '../../services/subscription';


const SubscriptionForm = ({ plans }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlan) {
      toast.error('Please select a plan');
      return;
    }
    
    setLoading(true);
    try {
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      await subscriptionService.createSubscription({
        planId: selectedPlan.id,
        paymentMethodId: paymentMethod.id
      });
      
      toast.success(`Successfully subscribed to ${selectedPlan.name} plan`);
    } catch (error) {
      toast.error(error.message || 'Subscription failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="subscription-container">
      {/* <div className="plans-grid">
        {plans.map(plan => (
          <div 
            key={plan.id}
            className={`plan-card ${selectedPlan?.id === plan.id ? 'selected' : ''}`}
            onClick={() => setSelectedPlan(plan)}
          >
            <h3>{plan.name}</h3>
            <p className="price">${plan.price}/month</p>
            <ul>
              <li>{plan.apiLimit.toLocaleString()} API Requests/month</li>
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      {selectedPlan && (
        <form onSubmit={handleSubmit} className="payment-form">
          <h3>Payment Information</h3>
          <div className="card-element">
            <CardElement options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }} />
          </div>
          <button 
            type="submit" 
            className="btn" 
            disabled={!stripe || loading}
          >
            {loading ? 'Processing...' : `Subscribe to ${selectedPlan.name}`}
          </button>
        </form>
      )} */}
    </div>
  );
};

export default SubscriptionForm;