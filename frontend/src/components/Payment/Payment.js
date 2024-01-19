import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  // const stripepro = loadStripe("pk_test_51OPNQKSIcr1N6nUkOB7TMTX6nj9nUI1bKxcZLufFePjJZlrAhKPk4Wyd50PytpRcF4aaBWExReWcLb4wkf9AxrqG00sjvpiTu4")

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const { token, error } = await stripe.createToken(elements.getElement(CardElement));
     alert(error)
    setLoading(false);

    if (error) {
      console.error(error);
    } else {
      // Send the token to your server
      fetch('http://localhost:5000/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: "0.1", // Replace with the desired amount in cents
          currency: 'usd',
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the client secret received from the server
          const { clientSecret } = data;

          stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                name: 'md Azeem', // Replace with the customer's name
              },
            },
          })
            .then((result) => {
              if (result.error) {
                console.error(result.error);
              } else {
                // Payment succeeded
                navigate("/preview")
                console.log(result.paymentIntent);
              }
            });
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement/>
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Pay And Download'}
      </button>
    </form>
  );
};

export default PaymentForm;
