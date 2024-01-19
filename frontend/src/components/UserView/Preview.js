import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ReactToPdf from "react-to-pdf";
import { Container, Navbar, Nav, Row, Col, Card } from "react-bootstrap";
import jwtDecode from "jwt-decode";
import { getCV } from "../../Config/ApiStore";
import { Paper } from "@mui/material";
import styles from "../../Preview.module.css";
import SaveAltRoundedIcon from "@mui/icons-material/SaveAltRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Template1 from "../Templates/Template1";
import Template2 from "../Templates/Template2";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import Swal from 'sweetalert2';
const options = {
  orientation: "potrait",
  unit: "in",
  format: "A4",
};
function Preview() {
  const [data, setData] = useState();
  const [cv, setCV] = useState();
  const [hide, setHide] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const stripe = useStripe(); 
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [success ,setSuccess] = useState("")

  console.log("state" ,state);
  const ref = React.createRef();
  useEffect(() => {
    getCV().then((res) => {
      const result = res.data;
      if (localStorage.getItem("_token") !== undefined) {
        let token = localStorage.getItem("_token");
        let decode = jwtDecode(token);
        console.log(decode);
        setData(decode);
        const orderData = result.filter((result) => result.id == decode.id);
        console.log("orderData", orderData);
        setCV(orderData);
      }
    });
  }, []);
  if (!localStorage.getItem("_token")) {
    window.location.replace("/login");
  }
  const Temp = localStorage.getItem("Component");
  const publishableKey =
    "pk_test_51OPNQKSIcr1N6nUkOB7TMTX6nj9nUI1bKxcZLufFePjJZlrAhKPk4Wyd50PytpRcF4aaBWExReWcLb4wkf9AxrqG00sjvpiTu4";
  const [product, setProduct] = useState({
    name: "Resume",
    price: 5,
  });
  const priceForStripe = product.price * 100;

  const handleSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Payment was successful",
      time: 4000,
    });
  };
  const handleFailure = () => {
    Swal.fire({
      icon: "success",
      title: "Payment was successful",
      time: 4000,
    });
    // navigate('/preview')
  };
  const payNow = async (tokenn) => {
    const data = {
      amount: product.price * 100,
      token: tokenn,
    };
    try {
      const response = await axios.post(
        "http://localhost:8899/api/posts/payment",
        data
      );
      console.log("razorpay", response);
      setSuccess(response)
      if (response.status === 200) {
        handleSuccess();
      }
    } catch (error) {
      handleFailure();
      console.log(error);
    }
  };

  return (
    <div>
      <Container>
        <nav className="navbar bg-success">
            <div className="container" style={{display:"flex" , justifyContent:"space-between"}}>
          <div class="container-fluid" style={{ marginLeft: "100px" }}>
            <Link to="/dashboard">
              <button className="btn btn-primary" style={{ height: "60px" }}>
                <ArrowBackRoundedIcon /> Go to Dashboard
              </button>
            </Link>
         </div>

{/* first end */}

             {success.status === 200  ? <div className="btn btn-success" > 
              <ReactToPdf
                targetRef={ref}
                filename={`CVgenerator.pdf`}
                options={options}
                x={0}
                y={0}
                scale={0.6}
              >
                {({ toPdf }) => (
                  <button
                    onClick={() => {
                      toPdf();
                    }}
                    className="btn btn-success"
                  >
                    <SaveAltRoundedIcon /> Download Pdf
                  </button>
                )}
              </ReactToPdf>
            </div>
             : 
               <div>
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
                  className="text text-warning"
                />
               </div> 
            }
              </div>

              {/* 2nd end */}
        </nav>
        {Temp !== undefined && Temp === "Template1" ? (
          <Paper
            ref={ref}
            id="divToPrint"
            elevation={5}
            className="mt-5 mb-5"
            style={{ padding: "40px" }}
          >
            <Template1 state={state} />
          </Paper>
        ) : (
          <Paper
            ref={ref}
            id="divToPrint"
            elevation={5}
            className="mt-5 mb-5"
            style={{ padding: "40px" }}
          >
            <Template2 styles={styles} state={state} />
          </Paper>
        )}
      </Container>
    </div>
  );
}

export default Preview;
