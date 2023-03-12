import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { useAppSelector } from '../../store/hooks';
import {PROTOCOL_HTTPS, STRIPE_KEY} from '../../service/constants';

const stripePromise = loadStripe(STRIPE_KEY);

const Checkout = () => {
    const { paymentData } = useAppSelector(state => state.shopReducer.orderReducer);

  
  
    return (
      <div>
        {PROTOCOL_HTTPS ? (<>
        {paymentData ? (
          <Elements stripe={stripePromise}>
            <CheckoutForm sessionId={paymentData.sessionId} />
          </Elements>
        ) : (
          <div>
            <h2>Order Form</h2>
          </div>
        )}
        </>) : (<>
        <a href={paymentData?.url}  className="btn btn-primary" target="_self">To pay</a>
        </>)}
      </div>
    );
};

export default Checkout;
