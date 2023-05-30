import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import { useStateContext } from "../config/context";

export default function Customer() {
  const { currentUser } = useStateContext();
  return (
    <Container className="mt-5 py-5">
      <Row className="w-100 mx-auto">
        <Col lg={2} className="bg-light p-3 d-none d-lg-block border ">
          <div
            className="w-100 position-relative"
            style={{ minHeight: "700px" }}
          >
            <NavLink
              to="/customer/profile"
              className={({ isActive }) =>
                isActive ? "text-danger" : "text-black"
              }
            >
              <h1 className="fs-4">Account</h1>
            </NavLink>
            <NavLink
              to="/customer/orders"
              className={({ isActive }) =>
                isActive ? "text-danger" : "text-black"
              }
            >
              <h1 className="fs-4">Orders</h1>
            </NavLink>
            <div>
              {currentUser?.token && currentUser?.isAdmin === true && (
                <>
                  <NavLink
                    to="/customer/admin/orders"
                    className={({ isActive }) =>
                      isActive ? "text-danger" : "text-black"
                    }
                  >
                    <h1 className="fs-4">Track orders</h1>
                  </NavLink>
                  <NavLink
                    to="/customer/admin/products"
                    className={({ isActive }) =>
                      isActive ? "text-danger" : "text-black"
                    }
                  >
                    <h1 className="fs-4">Products</h1>
                  </NavLink>
                </>
              )}
            </div>
            {/* <p
              onClick={logout}
              className='position-absolute top-100 cursor fs-5'
            >
              Logout
            </p> */}
          </div>
        </Col>
        <Col lg={10} className="border">
          <h1 className="fs-4 text-capitalize p-2">
            Welcome, {currentUser?.name}
          </h1>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
