import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderDetail } from "../api/api";
import { useStateContext } from "../config/context";
import { format } from "timeago.js";
import { Image } from "react-bootstrap";
import { formatCurrency } from "../utils/formatCurrency";

export default function Orderdetail() {
  const { id } = useParams();
  const [orderId, setOrderId] = useState({});
  const [isPay, setNoPay] = useState("");
  const { currentUser } = useStateContext();
  const navigate = useNavigate();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${currentUser.token}`,
    },
  };
  useEffect(() => {
    getOrderDetail(id, config)
      .then((res) => {
        setOrderId(res.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const track = orderId.status;

  useEffect(() => {
    track === 0 ? setNoPay("Preparing") : "";
    track === 1 ? setNoPay("On the way") : "";
    track === 2 ? setNoPay("Delivered") : "";
  }, [track]);

  return (
    <div className="border p-2">
      <div className="mt-3 mb-3 d-flex justify-content-between align-items-center border-bottom">
        <h1 className="fs-6">ORDER DETAILS</h1>
        <h1 className="fs-6 cursor" onClick={() => navigate(-1)}>
          BACK
        </h1>
      </div>
      <div className=" border-bottom mb-3">
        <p>Order no: {id}</p>
        {orderId?.orderItems?.map((order) => (
          <p key={order._id} className="text-secondary">
            Quantity: {order.quantity} {order.title}items
          </p>
        ))}
        <p className="text-secondary">
          Placed order {format(orderId.createdAt)}
        </p>
      </div>
      <h1 className="fs-6">ITEMS IN YOUR ORDER</h1>
      <div className="d-xl-flex justify-content-between border p-2 mb-3">
        <div>
          {orderId?.orderItems?.map((order) => (
            <div className="d-lg-flex align-items-center gap-4" key={order._id}>
              <Image
                src={order.images[0]}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "contain",
                }}
              />
              <div>
                <p>{order.title}</p>
                <p className="small text-secondary">
                  {formatCurrency(order.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-danger">STATUS</p>
        <div>
          <p>Payment</p>
          {orderId.isPaid ? (
            <p className="small text-secondary">Paid {orderId?.paidAt}</p>
          ) : (
            <p className="small text-secondary">Not paid</p>
          )}
        </div>
        <div>
          <p>Delivery</p>
          {orderId.isDelivered ? (
            <p className="small text-secondary">
              Delivered {orderId.deliveredAt}
            </p>
          ) : (
            <p className="small text-secondary">{isPay}</p>
          )}
        </div>
      </div>

      <div className="border mt-3 p-2 d-lg-flex justify-content-between align-items-center">
        <div>
          <h1 className="fs-6">PAYMENT INFORMATION</h1>
          <p className="mb-1">Payment Method</p>
          <p className="text-capitalize text-secondary">
            {orderId.paymentMethod}
          </p>
          <p className="mb-1">Payment Details</p>
          {orderId?.orderItems?.map((order) => (
            <p key={order._id} className="small text-secondary mb-1">
              item total: {formatCurrency(order.price)}
            </p>
          ))}
          <p className="small text-secondary mb-1">
            Delivery fee: {formatCurrency(orderId.shippingPrice)}
          </p>
          <p className="small text-secondary fw-bold">
            Total: {formatCurrency(orderId.totalPrice)}
          </p>
        </div>
        <div>
          <h1 className="fs-6">DELIVERY INFORMATION</h1>
          <p className="mb-1">Shipping Details</p>
          <p className="small text-secondary mb-1">
            {orderId?.shippingDetails?.address}
          </p>
          <p className="small text-secondary mb-1">
            Receiver:{" "}
            {orderId?.shippingDetails?.firstName +
              " " +
              orderId.shippingDetails?.lastName}
          </p>
          <p className="small text-secondary mb-1">
            Phone: {orderId?.shippingDetails?.phone}
          </p>
          <p className="small text-secondary">
            Location:{" "}
            {orderId?.shippingDetails?.state +
              " , " +
              orderId?.shippingDetails?.country}
          </p>
          <p className="mb-1">Buyer Details</p>
          <p className="small text-secondary text-capitalize mb-1">
            Name: {orderId?.user?.name}
          </p>
          <p className="small text-secondary">Email: {orderId?.user?.email}</p>
        </div>
      </div>
    </div>
  );
}
