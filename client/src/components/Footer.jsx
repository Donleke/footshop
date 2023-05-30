import React from "react";
import { Container } from "react-bootstrap";
import { AiFillGithub } from "react-icons/ai";

export default function Footer() {
  return (
    <Container className="mt-5 py-5">
      <div className="border-0 border-top border-dark mb-3" />
      <div className="d-flex justify-content-between align-items-center">
        <span>© 2023 Footshop™. All Rights Reserved.</span>
        <a href="#" target="_blank">
          <AiFillGithub size="1.8rem" />
        </a>
      </div>
    </Container>
  );
}
