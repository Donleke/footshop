import React, { useState, useEffect } from "react";
import { Modal, Accordion, Form } from "react-bootstrap";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { getCategories } from "../api/api";
import { useStateContext } from "../config/context";
import { AiOutlineClose } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";

export default function Menu() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState(query);
  const { currentUser, logout } = useStateContext();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`search/?q=${searchQuery}`);
      handleClose();
      setShowSearch(!showSearch);
    }
  };

  return (
    <>
      <span className="fs-4 cursor" onClick={handleShow}>
        MENU
      </span>
      <Modal show={show} onHide={handleClose} backdrop="static" fullscreen>
        <Modal.Header className="bgModal">
          <Modal.Title className="w-100">
            {showSearch ? (
              <div className="d-flex align-items-center gap-4">
                <Link to="/" onClick={handleClose} className="flex-grow-1">
                  <h1 className="fw-bold heading text-danger">Footshop</h1>
                </Link>
                <span
                  className="fs-4 cursor fw-light"
                  onClick={() => setShowSearch(!showSearch)}
                >
                  SEARCH
                </span>
                <span className="fs-4 cursor fw-light" onClick={handleClose}>
                  CLOSE
                </span>
              </div>
            ) : (
              <div className="border-0 border-bottom border-dark w-100 d-flex gap-4 align-items-center">
                <FiSearch type="submit" className="" size="1.8rem" />
                <Form onSubmit={handleSubmit} className="w-100">
                  <input
                    type="text"
                    placeholder="Search Footstore..."
                    className="border-dark bg-transparent py-2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Form>
                <AiOutlineClose
                  className=" cursor"
                  size="1.8rem"
                  onClick={() => {
                    setShowSearch(!showSearch);
                    setSearchQuery("");
                  }}
                />
              </div>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bgModal">
          {error && <p>{error.message}</p>}
          {categories.map((category) => (
            <NavLink
              key={category._id}
              to={`/products/category/${category.name}`}
              className={({ isActive }) => (isActive ? "text-danger" : "")}
              onClick={handleClose}
            >
              <h1 className="display-3 hover-link">{category.name}</h1>
            </NavLink>
          ))}

          <div className="border-0 border-bottom border-dark mt-4" />
          {currentUser ? (
            <>
              <h1 className="display-3 cursor d-none d-lg-block text-capitalize">
                Hi, {currentUser.name}
              </h1>
              <Accordion flush className="d-lg-none mt-2">
                <Accordion.Item eventKey="0" className="bg-Modal">
                  <Accordion.Header>
                    <h1 className="display-3 cursor text-capitalize">
                      Hi, {currentUser.name}
                    </h1>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Link to="customer/profile" onClick={handleClose}>
                      <p className="fs-4 mb-0 hover-link">Account</p>
                    </Link>
                    {currentUser.token && currentUser?.isAdmin === true && (
                      <>
                        <Link to="customer/admin/orders" onClick={handleClose}>
                          <p className="fs-4 mb-0 hover-link">Admin</p>
                        </Link>
                        <Link to="customer/orders" onClick={handleClose}>
                          <p className="fs-4 mb-0 hover-link">Orders</p>
                        </Link>
                        <Link
                          to="customer/admin/products"
                          onClick={handleClose}
                        >
                          <p className="fs-4 mb-0 hover-link">Products</p>
                        </Link>
                      </>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <p onClick={logout} className="fs-4 cursor mt-4">
                Logout
              </p>
            </>
          ) : (
            <NavLink
              to="/account"
              className={({ isActive }) => (isActive ? "text-danger" : "")}
              onClick={handleClose}
            >
              <h1>Account</h1>
            </NavLink>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
