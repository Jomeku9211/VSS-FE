import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./Billing.css";
import BillingPagination from "./BillingPagination";
import secret from '../config'

const BillingList = ({ match }) => {
  const [item, setItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);


  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7Il9pZCI6IjYwNTFkMDBkZWRhN2RkYTIwOWJmZjY2NyIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6IjIxMjMyZjI5N2E1N2E1YTc0Mzg5NGEwZTRhODAxZmMzIn0sImlhdCI6MTYxNzYxNjE0NiwiZXhwIjoxNjE3NzAyNTQ2fQ.oMYd1wQIpCxxRlnl-XNX2oY2YYOlarjK3jk-SSOxdqw";
        
        const response = await Axios.get(`${secret.Ip}/BillingManagement/billing`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
          console.log('response',response)
        if (isMounted) {
          if (response.status === 200) {
            const output = response.data.FinalBill;
            setItem(output);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);
  // Pagination Logics

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = item.slice(indexOfFirstPost, indexOfLastPost);
  console.log("currentPosts",currentPosts)

  //chnagePage

  const paginate = (pageNumbers) => setCurrentPage(pageNumbers);

  return (
    <Container className="mt-4 col-xl-10 col-md-10 col-md-12 col-sm-10">
      <h3 style={{ color: "grey", marginBottom: "20px" }}>Billing List</h3>

      <Container>
        <Row className="mb-4">
          {currentPosts.map((val,index) => (
              <Col
                key={index}
                className="col-xl-6 col-lg-6 col-sm-12 col-md-12 mb-3"
              >
                <Container className="billing_container p-3">
                  <Row>
                    <Container className="d-flex">
                      <div className="d-flex heading">
                        <p>OrderId</p>
                        <p>-</p>
                        <p>{val.orderId}</p>
                      </div>
                      <div className="d-flex ms-auto heading">
                        <p>Delivery-Date</p>
                        <p>-</p>
                        <p>{val.dpDate}</p>
                      </div>
                    </Container>
                  </Row>
                  <Row>
                    <Col className="col-xl-3 col-lg-3 col-md-3 col-sm-3 heading1">
                      FirstName
                    </Col>
                    <Col className="col-xl-7 col-lg-7 col-md-7 col-sm-7 content1">
                      {val.firmName}
                    </Col>
                  </Row>

                  <Row>
                    <Col className="col-xl-3 col-lg-3 col-md-3 col-sm-3 heading1">
                      Phone
                    </Col>
                    <Col className="col-xl-7 col-lg-7 col-md-7 col-sm-7 content1">
                      {val.phone_no}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-xl-3 col-lg-3 col-md-3 col-sm-3 heading1">
                      Address
                    </Col>
                    <Col className="col-xl-7 col-lg-7 col-md-7 col-sm-7 content1">
                      {val.address}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-xl-3 col-lg-3 col-md-3 col-sm-3 heading1">
                      City
                    </Col>
                    <Col className="col-xl-7 col-lg-7 col-md-7 col-sm-7 content1 ">
                      {val.city}
                    </Col>
                  </Row>
         
                  <Row>
                    <Container className="d-flex">
                      <Link
                        style={{
                          fontSize: "1rem",
                          textDecoration: "none",
                          color: "#0e2434",
                        }}
                        className="ms-auto"
                        to={`/billing/${val._id}`}
                      >
                        View More
                      </Link>
                    </Container>
                  </Row>
                </Container>
              </Col>
          ))}
        </Row>
      </Container>
      <Container
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "grid",
          marginBottom: "50px",
        }}
      >
        <BillingPagination
          postsPerPage={postsPerPage}
          totalPosts={item.length}
          paginate={paginate}
        />
      </Container>
    </Container>
  );
};

export default BillingList;