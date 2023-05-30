import React, { useState, useEffect } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "../api/api";
import { getAllProducts } from "../api/api";
import ImageSlider from "../components/ImageSlider";
import Productcard from "../components/Productcard";

export default function Home() {
  const [hero, setHero] = useState([]);
  const [casual, setCasual] = useState([]);
  const [sandals, setSandals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFeaturedProducts()
      .then((res) => {
        setHero(res.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }, []);
  useEffect(() => {
    getAllProducts()
      .then((res) => {
        setCasual(res.data);
        setSandals(res.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }, []);
  console.log("hero", hero);

  const heroProduct = hero.filter(
    (product) => product.title === "Black Chuck 70 Hi Sneakers"
  );

  const casualPicks = casual.filter(
    (product) =>
      product.category === "Sneakers" &&
      product.title !== "Black Chuck 70 Hi Sneakers"
  );

  const slipons = sandals?.filter((product) => product.category === "Sandals");

  return (
    <Container className="mt-5 py-5">
      <div className="border border-danger px-2 logo-width">
        <p className="texting mb-0">Footshop</p>
        <h1 className="text-danger display-3">Shop</h1>
      </div>
      <h1
        className="text-danger text-end display-3"
        style={{ marginTop: "5rem" }}
      >
        Fashion
      </h1>
      <div style={{ border: "1px solid red" }} />
      {error && <p>{error.message}</p>}
      <Row className="w-100 mx-auto mt-3">
        {heroProduct.map((product) => (
          <Col md={6} key={product._id}>
            <Image
              src={product?.images?.[0]}
              alt={product.title}
              className="img-fluid"
            />
          </Col>
        ))}
        <Col>
          <p className="small text-danger mb-0">STYLE</p>
          <p className="texting">The converse flexes Lagos to Abuja</p>
          {heroProduct.map((product) => (
            <Link to={`/product/${product.slug}`} key={product._id}>
              <Button variant="dark" className="rounded-0'">
                BUY NOW
              </Button>
            </Link>
          ))}
        </Col>
      </Row>
      <h1
        className="text-danger text-end display-3"
        style={{ marginTop: "5rem" }}
      >
        Casual picks
      </h1>
      <div style={{ border: "1px solid red" }} className="mb-5" />
      <ImageSlider casualPicks={casualPicks} />
      <h1
        className="text-danger text-end display-3"
        style={{ marginTop: "5rem" }}
      >
        Slip on
      </h1>
      <div style={{ border: "1px solid red" }} className="mb-5" />
      <p className="small text-danger mb-0">COMFY</p>
      <p className="texting">Feel chic on these, smooth comfort all day</p>
      <Row className="w-100 mx-auto">
        {slipons.map((product) => (
          <Col md={6} key={product._id}>
            <Productcard {...product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
