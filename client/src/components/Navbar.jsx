import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Container, Dropdown } from "react-bootstrap";
import Cart from "./Cart";
import Menu from "./Menu";

export default function Navbar() {
  const [showLogo, setShowLogo] = useState(false);

  const showNav = () => {
    window.scrollY >= 100 ? setShowLogo(true) : setShowLogo(false);
  };

  useEffect(() => {
    showNav();
    window.addEventListener("scroll", showNav);
    return () => {
      window.removeEventListener("scroll", showNav);
    };
  }, []);
  return (
    <div
      className="position-fixed top-0 py-3 px-2 w-100 bg-white"
      style={{ zIndex: "5" }}
    >
      <Container>
        <div
          className={
            showLogo
              ? "d-flex justify-content-between align-items-center"
              : "d-flex justify-content-end align-items-center"
          }
        >
          <NavLink to="/" className={showLogo ? "d-flex" : "d-none"}>
            <h1 className="heading">Footshop</h1>
          </NavLink>
          <div className="d-flex gap-2 gap-lg-4">
            <Cart />
            <Menu />
          </div>
        </div>
      </Container>
    </div>
  );
}
