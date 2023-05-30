import React, { useState } from "react";
import { Offcanvas, Accordion, Image, Button } from "react-bootstrap";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useStateContext } from "../config/context";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";
import { AiOutlineClose } from "react-icons/ai";

export default function Cart() {
  const [show, setShow] = useState(false);
  const { cartQuantity, cartItems, updateCart, removeFromCart, priceSum } =
    useStateContext();
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <>
      <div className="position-relative" onClick={handleShow}>
        <span className="fs-4 cursor" title={`${cartQuantity}`}>
          CART
        </span>
        <span className="position-absolute top-25 start-100 translate-middle badge rounded-pill bg-danger">
          {cartQuantity > 0 ? cartQuantity : 0}
        </span>
      </div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        backdrop="static"
      >
        <Offcanvas.Header>
          <Offcanvas.Title>
            <div>
              <MdOutlineArrowBackIosNew
                onClick={handleClose}
                className="cursor"
              />
              <h1>Cart</h1>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartItems.length > 0 ? (
            <>
              <hr style={{ border: "1px solid black" }} />
              {cartItems.map((item) => (
                <Accordion flush key={item._id} defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <div>
                        <p className="text-dark">{item.title}</p>
                        <p className="text-secondary small">{item.category}</p>
                      </div>
                    </Accordion.Header>
                    <hr style={{ border: "1px solid black" }} />
                    <Accordion.Body>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex gap-3">
                          <Link
                            to={`/product/${item.slug}`}
                            onClick={handleClose}
                          >
                            <Image
                              src={item.images[0]}
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "contain",
                              }}
                            />
                          </Link>
                          <div>
                            <p className="text-secondary mb-0">{item.brand}</p>
                            <p className="text-secondary small">
                              {formatCurrency(item.price)}
                            </p>
                            <div
                              className="d-flex justify-content-between px-2 border border-2"
                              style={{ width: "100px" }}
                            >
                              <div
                                className="border-0 border-end px-2 cursor"
                                onClick={() => updateCart(item._id, -1)}
                              >
                                -
                              </div>
                              <div className="px-2">{item.quantity}</div>
                              <div
                                className="border-0 border-start px-2 cursor"
                                onClick={() => updateCart(item._id, 1)}
                              >
                                +
                              </div>
                            </div>
                          </div>
                        </div>
                        <>
                          <AiOutlineClose
                            onClick={() => removeFromCart(item._id)}
                            className="cursor ms-auto"
                          />
                        </>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              ))}

              <hr style={{ border: "1px solid black" }} />
              <div className="d-flex justify-content-between">
                <p>Subtotal:</p>
                <p>{formatCurrency(priceSum)}</p>
              </div>
              <Link to="/checkout" onClick={handleClose}>
                <Button
                  variant="danger"
                  className="w-100 rounded-0 mb-4"
                  size="lg"
                >
                  CHECKOUT
                </Button>
              </Link>
            </>
          ) : (
            <p className="">Your cart is empty</p>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
