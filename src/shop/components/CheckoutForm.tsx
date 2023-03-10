import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface Props {
  sessionId: string;
}

const CheckoutForm: React.FC<Props> = ({ sessionId }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var cardElement = elements?.getElement(CardElement)

    if (stripe && cardElement) {
    const stripeResponse = await stripe.confirmCardPayment(sessionId, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: (event.target as any).name.value
        }
      }
    }).then((res:any)=>{
      // console.log("Stripe response:", res);
      return res;
    }, (err:any)=>{
      // console.log("Stripe response ERROR:", err);
    });
    if (stripeResponse) {
      // console.log(stripeResponse);
    }}
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Payment Form</h2>
      <label>
        Name on Card:
        <input type="text" name="name" />
      </label>
      <CardElement />
      <button type="submit">Pay Now</button>
    </form>
  );
};

export default CheckoutForm;
