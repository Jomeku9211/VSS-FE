import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ListOrder.css";
import Axios from "axios";
import LoaderComp from "../Loader/LoaderComp";
import BillingPagination from "../Billing/BillingPagination";
import secret from "../config";

const ListOrder = ({ match }) => {
  const [item, setItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = item.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumbers) => setCurrentPage(pageNumbers);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const token = "your_token_here";
        const response = await Axios.get(`${secret.Ip}/BillingManagement/all`, {
          headers: { Authorization: `Bearer ${token} ` },
        });
        const finalResponse = response.data.output.results;
        console.log("Final response", finalResponse);
        if (isMounted) {
          setItem(finalResponse);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      isMounted = false;
    };
  }, []);

  const handleDelete = async (orderId) => {
    try {
      const token = "your_token_here";
      await Axios.delete(`${secret.Ip}/BillingManagement/delete/${orderId}`, {
        headers: { Authorization: `Bearer ${token} ` },
      });
      setItem(item.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <>
      {currentPosts.length !== 0 || currentPosts.length === 0 ? (
        <Container>
          <>
            <Row>
              <div className="Header_Div my-3 ">
                <h4 className="">Orders</h4>
                <Col className="">
                  <Link to="/create_order">
                    <button className="create-Button">
                      Create Order{" "}
                      <i class="fa fa-plus-square" aria-hidden="true"></i>
                    </button>
                  </Link>
                </Col>
              </div>
            </Row>
            <Row>
              {currentPosts.length === 0 ? (
                <Col className="no_order_box">
                  <p>No orders found : )</p>
                </Col>
              ) : (
                currentPosts.map((val, index) => (
                  <Col key={val._id}>
                    <Container
                      className="my-3 orderDiv col-xs-8 col-sm-8 col-md-6 col-lg-6 col-xl-6 p-3 "
                      style={
                        Math.abs(index % 2) === 1
                          ? { backgroundColor: "#cddde8" }
                          : { backgroundColor: "lightgrey" }
                      }
                    >
                      <Row>
                        <Col>
                          <Row style={{ fontSize: "15px" }}>
                            <Col className="col-lg-4 col-sm-4">
                              <h4 className="main_heading">Order ID</h4>
                            </Col>
                            <Col className="col-lg-1 col-sm-1">-</Col>
                            <Col className="col-lg-6 col-sm-6 main_content">
                              {val.orderId}
                            </Col>
                          </Row>
                        </Col>
                        <Col>
                          <Col
                            className="d-flex me-auto"
                            style={{ fontSize: "15px", align: "right" }}
                          >
                            <div className="ms-auto d-flex">
                              <p className="heading mr-1">
                                <b>Deliver Date</b>
                              </p>
                              <p>-</p>
                              <p>{val.deliveryDate}</p>
                            </div>
                          </Col>
                        </Col>
                      </Row>
                      <Row className="pt-1">
                        <Col className="col-lg-4 col-sm-4">
                          <h6 className="heading">
                            Client Name <i className="fas fa-user-tie"></i>
                          </h6>
                        </Col>
                        <Col className="col-lg-1 col-sm-1">-</Col>
                        <Col className="col-lg-6 col-sm-6 content">
                          {val?.clientName}
                        </Col>
                      </Row>
                      <Row className="pt-1">
                        <Col className="col-lg-4 col-sm-4">
                          <h6 className="heading">
                            Firm Name <i className="fas fa-user-tie"></i>
                          </h6>
                        </Col>
                        <Col className="col-lg-1 col-sm-1">-</Col>
                        <Col className="col-lg-6 col-sm-6 content">
                          {val.firmName}
                        </Col>
                      </Row>
                      <Row className="pt-1">
                        <Col className="col-lg-4 col-sm-4">
                          <h6 className="heading">
                            OrderId <i className="fas fa-user-tie"></i>
                          </h6>
                        </Col>
                        <Col className="col-lg-1 col-sm-1">-</Col>
                        <Col className="col-lg-6 col-sm-6 content">
                          {val.orderId}
                        </Col>
                      </Row>
                      <Row className="pt-1">
                        <Col className="col-lg-4 col-sm-4">
                          <h6 className="heading">Address</h6>
                        </Col>
                        <Col className="col-lg-1 col-sm-1">-</Col>
                        <Col className="col-lg-6 col-sm-6 content">
                          {val.address}
                        </Col>
                      </Row>
                      <Row className="pt-1">
                        <Col className="col-lg-4 col-sm-4">
                          <h6 className="heading">PhoneNumber</h6>
                        </Col>
                        <Col className="col-lg-1 col-sm-1">-</Col>
                        <Col className="col-lg-6 col-sm-6 content">
                          {val.phone_no}
                        </Col>
                      </Row>
                      <Row>
                        <Col className="col-lg-12 col-sm-12 d-flex justify-content-end">
                          <button
                            className="delete_button"
                            onClick={() => handleDelete(val._id)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                          <button
                            className="ms-2"
                            style={{
                              width: "auto",
                              border: "none",
                              backgroundColor: "transparent",
                            }}
                          >
                            <Link
                              className="view_more"
                              style={{}}
                              to={`/listOrder/${val._id}`}
                            >
                              <button>View More...</button>
                            </Link>
                          </button>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                ))
              )}
            </Row>
            <Row>
              <Container
                className="col-xl-8 col-lg-8 col-md-8 col-sm-8"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "grid",
                }}
              >
                <BillingPagination
                  postsPerPage={postsPerPage}
                  totalPosts={item.length}
                  paginate={paginate}
                />
              </Container>
            </Row>
          </>
        </Container>
      ) : (
        <Container
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "grid",
            marginTop: "20%",
          }}
        >
          <LoaderComp type={"Circles"} height={100} color={"#0e2434"} />
        </Container>
      )}
    </>
  );
};

export default ListOrder;
