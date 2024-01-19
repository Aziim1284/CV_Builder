import React, { useState  ,useEffect} from 'react';
import {useStripe, useElements ,LinkAuthenticationElement ,PaymentElement} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { MAIN_URL } from '../Config/Url';
import StripeCheckout from 'react-stripe-checkout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const PaymentsRazor = () => {
  const tokenn = localStorage.getItem("_token")
    const navigate =useNavigate()
  const publishableKey =
  'pk_test_51OPNQKSIcr1N6nUkOB7TMTX6nj9nUI1bKxcZLufFePjJZlrAhKPk4Wyd50PytpRcF4aaBWExReWcLb4wkf9AxrqG00sjvpiTu4';
const [product, setProduct] = useState({
  name: 'Resume',
  price: 5,
});
const priceForStripe = product.price * 100;

const handleSuccess = () => {
  Swal.fire({
    icon: 'success',
    title: 'Payment was successful',
    time: 4000,
  });
};
const handleFailure = () => {
  Swal.fire({
    icon: 'success',
    title: 'Payment was successful',
    time: 4000,
  });
  // navigate('/preview')
};
const payNow = async (tokenn) => {
  const data ={
    amount : product.price*100,
    token: tokenn
  }
  try {
    const response = await axios.post('http://localhost:8899/api/posts/payment', data);
    console.log("razorpay" , response)
    if (response.status === 200) {
      handleSuccess();
    }
  } catch (error) {
    handleFailure();
    console.log(error);
  }
};


  return (
    <div className="container">
    <h2>You have to Pay First then only you can download the Pdf file</h2>
    <p>
      <span>Product: </span>
      {product.name}
    </p>
    <p>
      <span>Price: </span>${product.price}
    </p>
    <StripeCheckout
      stripeKey={publishableKey}
      label="Pay Now"
      name="Pay With Credit Card"
      billingAddress
      shippingAddress
      amount={priceForStripe}
      description={`Your total is $${product.price}`}
      token={payNow}
    />
  </div>
  );
};

export default PaymentsRazor;

