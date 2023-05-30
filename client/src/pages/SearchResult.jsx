import React, { useEffect, useState } from "react";
import { Col, Container, Form, Image, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getProductBySearch } from "../api/api";
import Spinner from "../utils/Spinner";
import { FiSearch } from "react-icons/fi";

export default function SearchResult() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const queryParams = query.get("q");
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(queryParams);

  useEffect(() => {
    window.document.title = `Search result for "${queryParams}"`;
    setLoading(true);
    getProductBySearch(queryParams)
      .then((res) => {
        setResult(res.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
    setLoading(false);
  }, [queryParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/search/?q=${searchQuery}`);
    }
  };

  return (
    <Container className="mt-5 py-5">
      <div>
        <p className="fw-light">RESULT FOR:</p>
        <div className="border-0 border-bottom border-danger w-100 d-flex gap-4 align-items-center">
          <Form onSubmit={handleSubmit} className="w-100">
            <input
              type="text"
              placeholder="Search Footstore..."
              className="border-dark text-danger py-2 display-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form>
          <FiSearch className=" cursor" size="1.8rem" type="submit" />
        </div>
        {loading && <Spinner />}
        {error && <p className="mt-5 py-5">{error.message}</p>}
        {result.length > 0 ? (
          <>
            {result.map((product) => (
              <Row
                className="border-0 border-top mt-5 mb-5 w-100 mx-auto"
                key={product._id}
              >
                <Col lg={8}>
                  <Link to={`/product/${product.slug}`}>
                    <div className="mt-3 d-flex gap-5">
                      <Image
                        src={product?.images?.[0]}
                        alt={product.title}
                        style={{
                          width: "200px",
                          height: "200px",
                          objectFit: "contain",
                        }}
                      />
                      <div>
                        <p className="text-danger">{product.category}</p>
                        <h1 className="fs-3">{product.title}</h1>
                      </div>
                    </div>
                  </Link>
                </Col>
                <Col lg={4}>
                  <Link to={`/product/${product.slug}`}>
                    <div className="mt-3">
                      <p className="small fw-light">{product.desc}</p>
                      <p>{product.brand}</p>
                    </div>
                  </Link>
                </Col>
              </Row>
            ))}
          </>
        ) : (
          <p className="text-center mt-5 py-5">No results</p>
        )}
      </div>
    </Container>
  );
}
