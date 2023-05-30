import React, { useEffect, useState } from "react";
import { useStateContext } from "../config/context";
import { getUserOrder } from "../api/api";
import { Button, Image } from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const { currentUser } = useStateContext();
  const location = useLocation();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${currentUser.token}`,
    },
  };
  useEffect(() => {
    getUserOrder(config)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      {location.pathname === "/customer/orders" ? (
        <div className="border p-2">
          <h1 className="fs-6 mt-3 mb-3 border-bottom">
            ORDERS ({orders.length})
          </h1>
          {orders.length > 0 ? (
            <>
              {orders.map((order, i) => (
                <div
                  className="d-flex gap-4 flex-wrap border-bottom mb-4"
                  key={i}
                >
                  <Link to={`/product/${order.orderItems[0].slug}`}>
                    <Image
                      src={order.orderItems[0].images[0]}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain",
                      }}
                    />
                  </Link>
                  <div className="flex-grow-1">
                    <p className="mb-0">{order.orderItems[0].title}</p>
                    <p className="text-secondary small">OrderId: {order._id}</p>
                    <p className="text-secondary small">
                      Delivered:{" "}
                      {order.isDelivered ? <>Delivered</> : <>Not Delivered</>}
                    </p>
                  </div>
                  <Link to={`/customer/orders/${order._id}`}>
                    <Button variant="danger" className="rounded-0">
                      SEE DETAILS
                    </Button>
                  </Link>
                </div>
              ))}
            </>
          ) : (
            <h1 className="mt-4 fs-4">
              Sorry, you have no orders. To see orders, start by purchasing an
              item.
            </h1>
          )}
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
}
