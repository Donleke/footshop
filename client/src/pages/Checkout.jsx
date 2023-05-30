import React from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useStateContext } from "../config/context";
import { formatCurrency } from "../utils/formatCurrency";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import registerOptions from "../utils/formValidation";

export default function Checkout() {
  const {
    cartItems,
    priceSum,
    setShippingDetails,
    totalPrice,
    shippingPrice,
    taxPrice,
  } = useStateContext();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setShippingDetails(data);
    navigate("/checkout/checkoutdetails");
  };

  return (
    <Container className="mt-5 py-5">
      <div className="d-flex justify-content-between px-4">
        <p className="texting mb-4">Checkout</p>
        <h1
          className="d-none d-lg-flex cursor fs-6"
          onClick={() => navigate(-1)}
        >
          BACK
        </h1>
      </div>
      <Row className="w-100 mx-auto">
        <Col lg={6}>
          {location.pathname === "/checkout" ? (
            <>
              <Form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                <Form.Group controlId="formBasicFirstName" className="mb-4">
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="FirstName"
                    className="mb-0 rounded-0"
                    {...register("firstName", registerOptions.firstName)}
                  />
                  {errors?.firstName && (
                    <span className="text-danger small">
                      {errors.firstName.message}
                    </span>
                  )}
                </Form.Group>
                <Form.Group controlId="formBasicLastName" className="mb-4">
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="LastName"
                    className="mb-0 rounded-0"
                    {...register("lastName", registerOptions.lastName)}
                  />
                  {errors?.lastName && (
                    <span className="text-danger small">
                      {errors.lastName.message}
                    </span>
                  )}
                </Form.Group>
                <Form.Group controlId="formBasicAddress" className="mb-4">
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="Address"
                    className="mb-0 rounded-0"
                    {...register("address", registerOptions.address)}
                  />
                  {errors?.address && (
                    <span className="text-danger small">
                      {errors.address.message}
                    </span>
                  )}
                </Form.Group>
                <Form.Group controlId="formBasicState" className="mb-4">
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="State"
                    className="mb-0 rounded-0"
                    {...register("state", registerOptions.state)}
                  />
                  {errors?.state && (
                    <span className="text-danger small">
                      {errors.state.message}
                    </span>
                  )}
                </Form.Group>

                <Form.Group controlId="formBasicPhone" className="mb-4">
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="Phone"
                    className="mb-0 rounded-0"
                    {...register("phone", registerOptions.phone)}
                  />
                  {errors?.phone && (
                    <span className="text-danger small">
                      {errors.phone.message}
                    </span>
                  )}
                </Form.Group>
                <Form.Group controlId="formBasicPostal" className="mb-4">
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="Postalcode"
                    className="mb-0 rounded-0"
                    {...register("postalCode", registerOptions.postalCode)}
                  />
                  {errors?.postalCode && (
                    <span className="text-danger small">
                      {errors.postalCode.message}
                    </span>
                  )}
                </Form.Group>
                <Form.Group controlId="formBasicCountry" className="mb-4">
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="Country"
                    className="mb-0 rounded-0"
                    {...register("country", registerOptions.country)}
                  />
                  {errors?.country && (
                    <span className="text-danger small">
                      {errors.country.message}
                    </span>
                  )}
                </Form.Group>
                <Button
                  variant="dark"
                  type="submit"
                  className="rounded-0 w-100"
                >
                  CONTINUE TO PAYMENT
                </Button>
              </Form>
            </>
          ) : (
            <Outlet />
          )}
        </Col>
        <Col lg={6}>
          <div className="bg-light py-3 px-2 flex-grow-1">
            <p className="texting">Order summary</p>
            {cartItems.map((item) => (
              <div key={item._id}>
                <p className="text-dark mb-0">{item.title}</p>
                <p className="text-secondary small mb-0">{item.category}</p>
                <div className="d-flex justify-content-between">
                  <Image
                    src={item.images[0]}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                    }}
                  />
                  <div>
                    <p className="text-secondary small">
                      QUANTITY: {item.quantity}
                    </p>
                    <p className="text-secondary small">
                      PRICE: {formatCurrency(item.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <hr style={{ border: "1px solid black" }} />
            <div className="d-flex justify-content-between mt-3">
              <p>Subtotal:</p>
              <p>{formatCurrency(priceSum)}</p>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <p>Shipping:</p>
              <p>
                {priceSum <= 0
                  ? formatCurrency(0.0)
                  : formatCurrency(shippingPrice)}
              </p>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <p>Tax:</p>
              <p>{formatCurrency(taxPrice)}</p>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <p>Total:</p>
              <p className="fw-bold">
                {priceSum <= 0
                  ? formatCurrency(0.0)
                  : formatCurrency(totalPrice)}
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
