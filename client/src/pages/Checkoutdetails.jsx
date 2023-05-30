import React from "react";
import { useStateContext } from "../config/context";
import { Button, Col, Row } from "react-bootstrap";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { paypalOrder, placeOrder } from "../api/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Checkoutdetails() {
  const navigate = useNavigate();
  const {
    shippingDetails,
    currentUser,
    setPaymentMethod,
    paymentMethod,
    cartItems,
    totalPrice,
    shippingPrice,
    taxPrice,
    resetOrder,
  } = useStateContext();
  const paymentOptions = [
    ["Cash", "cash"],
    ["Paypal", "paypal"],
  ];

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${currentUser.token}`,
    },
  };

  const order = {
    orderItems: cartItems,
    shippingDetails: shippingDetails,
    paymentMethod: paymentMethod,
    taxPrice: taxPrice,
    shippingPrice: shippingPrice,
    totalPrice: totalPrice,
  };

  const fillOrder = async () => {
    try {
      const res = await placeOrder(order, config);
      if (res.status === 201) {
        toast.success("Order successfull");
      }
      if (order.paymentMethod === "paypal") {
        await paypalOrder(res.data._id, order, config);
        toast.success("Payment successfull");
      }
      resetOrder();
      navigate(`/customer/orders/${res.data._id}`);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Your purchase details",
            amount: {
              currency_code: "USD",
              value: totalPrice,
            },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      fillOrder(order);
    });
  };
  return (
    <Row className="w-100 mx-auto">
      <Col>
        <div className="text-capitalize form-resize text-secondary mb-4">
          <p className="text-capitalize mb-0">
            {shippingDetails.firstName + " " + shippingDetails.lastName}
          </p>
          <p className="mb-1">{shippingDetails.address},</p>
          <p className="mb-1">phone: {shippingDetails.phone}</p>
          <p className="mb-1">zip: {shippingDetails.postalCode}</p>
          <p className="mb-1">{shippingDetails.state}</p>
          <p className="mb-1">{shippingDetails.country}</p>
        </div>
        <p>Select payment method</p>
        {paymentOptions.map(([text, value], i) => (
          <div className="form-check" key={i}>
            <input
              className="form-check-input"
              type="radio"
              name="paymentmethod"
              id={text}
              value={value}
              defaultChecked={value === "cash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="form-check-label" htmlFor={value}>
              {text}
            </label>
          </div>
        ))}
        {paymentMethod === "cash" ? (
          <Button
            variant="danger"
            className="w-100 rounded-0 mt-4 mb-4"
            size="lg"
            onClick={fillOrder}
          >
            PLACEORDER
          </Button>
        ) : (
          <PayPalScriptProvider
            options={{
              "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
              currency: "USD",
              "disable-funding": "credit,card,p24",
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={createOrder}
              onApprove={onApprove}
            />
          </PayPalScriptProvider>
        )}
      </Col>
    </Row>
  );
}
