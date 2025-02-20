import React, { useState, useEffect, useRef } from "react";
import "./Stocks.css";
import { Container, Col, Row, Modal, Alert } from "react-bootstrap";
import Axios from "axios";
import LoaderComp from "../Loader/LoaderComp";
import EditModal from "./EditModal";
import secret from "../config";
import Constants from "../constants";
import axios from "axios";

const Stocks = ({ match }) => {
  const [item, setItem] = useState([]);
  const [weight, setweight] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const inputElement = useRef("");
  const [lgShow, setLgShow] = useState(false);
  const [lgEditShow, setLgEditShow] = useState(false);
  const [failureAlert, setFailureAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const [items, setItems] = useState({
    product: "",
    company: "",
    temper: "",
    grade: "",
    topcolor: "",
    thickness: "",
    width: "",
    length: "",
    coating: "",
    weight: "",
    pcs: "",
    guardfilm: "",
  });
 
  // useEffect(() => {
  //   const reloadKey = "hasRefreshed";

   
  //   if (!window.localStorage.getItem(reloadKey)) {
  //     window.localStorage.setItem(reloadKey, "true");
  //     window.location.reload(); 
  //   }

   
  //   return () => {
  //     window.localStorage.removeItem(reloadKey);
  //   };
  // }, []);

  // const processFetchedData = (data) => {
  //   // Step 1: Remove batch_number
  //   const sanitizedData = data.map(({ batch_number, ...rest }) => rest);
  
  //   // Step 2: Combine entries with the same attributes (skip duplicates)
  //   const combinedData = sanitizedData.reduce((acc, curr) => {
  //     const key = `${curr.product}-${curr.company}-${curr.grade}-${curr.topcolor}-${curr.coating}-${curr.temper}-${curr.guardfilm}-${curr.thickness}-${curr.width}`;
  //     if (!acc[key]) {
  //       acc[key] = { ...curr };
  //     }
  //     return acc;
  //   }, {});
  
  //   // Step 3: Convert the combined object back to an array
  //   return Object.values(combinedData);
  // };
  
  const handleChange = (e) => {
    e.preventDefault();
    setItems({ ...items, [e.target.name]: e.target.value });
  };
  
  const formData = {
    product: items.product,
    company: items.company,
    temper: items.temper,
    grade: items.grade,
    topcolor: items.topcolor,
    thickness: encodeURIComponent(items.thickness),
    width: parseInt(items.width),
    length: parseInt(items.length),
    coating: encodeURIComponent(items.coating),
    weight: parseInt(items.weight),
    pcs: parseInt(items.pcs),
    guardfilm: items.guardfilm,
    density: 0.00000784,
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      await Axios.post(`${secret.Ip}/Stock_M/create`, formData, {
        headers: {
          Authorization: `Bearer ${secret.token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => {
          if (response.status === 201 || response.status === 200) {
            console.log(response);
            setLoading(false);
            setSuccessAlert(true);
            e.target.reset();
            setTimeout(() => {
              setSuccessAlert(false);
              window.location.href = "/stocks";
              window.location.reload();
            }, 1000);
          } else {
            setLoading(false);
            setFailureAlert(true);
            setTimeout(() => {
              setFailureAlert(false);
            }, 1500);
          }
        })
        .catch((err) => {
          setLoading(false);
          setFailureAlert(true);
          setTimeout(() => {
            setFailureAlert(false);
          }, 3000);
        });
    }, 3000);
  };

  const getSearchTerm = () => {
    searchHandler(inputElement.current.value);
  };

  const onDelete = async (id) => {
    console.log(id);
    await Axios.delete(`${secret.Ip}/Stock_M/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${secret.token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {
      console.log(response);
      window.location.reload(); // Reload the page
    });
  };

  const handleConfirm = (val, e) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    const toDelete = confirm("Want to Delete this Stock?");
    if (toDelete) {
      onDelete(val, e);
    }
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newItemsList = item.filter((items) => {
        return Object.values(items)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newItemsList);
    } else {
      setSearchResults(item);
    }
  };

  useEffect(() => {
    if (lgShow) {
      const modal = document.querySelector('.modal');
      if (modal) {
        modal.style.zIndex = 1050;
      }
    }
  }, [lgShow]);
  
  useEffect(() => {
    const fetchData = async () => {
      await Axios.get(`${secret.Ip}/Stock_M/get`, {
        headers: {
          Authorization: `Bearer ${secret.token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => {
        setItem(response.data.res);
        console.log("response.data.res", response.data.res);
      });
    };
    fetchData();
  }, []); //item


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${secret.Ip}/salesManger/Totalweight`,
          {
            headers: {
              Authorization: `Bearer ${secret.token}`,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        setweight(response.data);
        console.log("Total weight is", response.data);
      } catch (error) {
        console.error("Error fetching total weight:", error);
      }
    };

    fetchData();
  }, []);

  const ChangeEditShow = (value) => {
    setModalValue(value);
    setLgEditShow(true);
  };

  
  return (
    <div className="stock_main_div">
      {/* ADDUSER MODEL START  */}
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        // backdrop="static"
        // keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Create Stocks
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <Container
              fluid
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "block",
              }}
            >
              <Row>
                <div>
                  <Alert
                    show={successAlert}
                    onClose={() => setSuccessAlert(false)}
                    variant="success"
                    dismissible
                    style={{
                      height: "auto",
                      textAlign: "center",
                    }}
                  >
                    Stocks Created SuccessFully
                  </Alert>
                </div>
                <div>
                  <Alert
                    show={failureAlert}
                    onClose={() => setFailureAlert(false)}
                    dismissible
                    variant="danger"
                    style={{
                      height: "auto",
                      textAlign: "center",
                    }}
                  >
                    Please Fill the form Correctly...
                  </Alert>
                </div>
              </Row>
              <Container className="d-flex-grow">
                <Row className="mb-3">
                  <Col className="col-lg-6 col-xl-6 col-sm-5 col-md-6">
                    <select
                      name="product"
                      value={items.product}
                      onChange={handleChange}
                      className="w-100"
                      required
                    >
                      {Constants.Product.map((val, arr) => (
                        <option value={val.id} key={arr}>
                          {val.name}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col className="col-lg-6 col-xl-6 col-sm-5 col-md-6">
                    <select
                      name="company"
                      value={items.company}
                      onChange={handleChange}
                      className="w-100"
                      required
                    >
                      {Constants.Company.map((val, arr) => (
                        <option value={val.id} key={arr}>
                          {val.name}
                        </option>
                      ))}
                    </select>
                  </Col>
                </Row>
              </Container>
              <Container>
                <Row className="mb-3">
                  <Col className="col-lg-6 col-xl-6 col-sm-5 col-md-6">
                    <select
                      name="grade"
                      value={items.grade}
                      onChange={handleChange}
                      className="w-100"
                      required
                    >
                      {Constants.Grade.map((val, arr) => (
                        <option value={val.id} key={arr}>
                          {val.name}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col className="col-lg-6 col-xl-6 col-sm-5 col-md-6">
                    <select
                      name="topcolor"
                      value={items.topcolor}
                      onChange={handleChange}
                      className="w-100"
                      required
                    >
                      {Constants.Color.map((val, arr) => (
                        <option value={val.id} key={arr}>
                          {val.name}
                        </option>
                      ))}
                    </select>
                  </Col>
                </Row>
              </Container>
              <Container>
                <Row className="mb-3">
                  <Col className="col-lg-6 col-xl-6 col-sm-5 col-md-6">
                    <select
                      name="coating"
                      value={items.coating}
                      onChange={handleChange}
                      className="w-100"
                      required
                    >
                      {Constants.Coating.map((val, arr) => (
                        <option value={val.id} key={arr}>
                          {val.name}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col className="col-lg-6 col-xl-6 col-sm-5 col-md-6">
                    <select
                      name="temper"
                      value={items.temper}
                      onChange={handleChange}
                      className="w-100"
                      required
                    >
                      {Constants.Temper.map((val, arr) => (
                        <option value={val.id} key={arr}>
                          {val.name}
                        </option>
                      ))}
                    </select>
                  </Col>
                </Row>
              </Container>
              <Container>
                <Row>
                  <Col>
                    <label>Thickness</label>
                    <Container className="measure_conatiner">
                      <input
                        value={items.thickness}
                        onChange={handleChange}                        
                        placeholder="Thickness"
                        min="0.1"
                        type="encodeURIComponent"
                        name="thickness"
                        required
                      />
                      <span className="py-2">mm</span>
                    </Container>
                  </Col>
                  <Col>
                    <label>Width</label>
                    <Container className="measure_conatiner">
                      <input
                        value={items.width || ""}
                        onChange={handleChange}
                        placeholder="width"
                        min="0"
                        type="number"
                        name="width"
                        required
                      />
                      <span className="py-2">mm</span>
                    </Container>
                  </Col>
                  <Col>
                    <label>length</label>
                    <Container className="measure_conatiner">
                      <input
                        value={items.length || ""}
                        onChange={handleChange}
                        name="length"
                        placeholder="length"
                        min="0"
                        type="number"
                        required
                      />
                      <span className="py-2">m</span>
                    </Container>
                  </Col>
                </Row>
              </Container>
              <Container className="mt-3">
                <Row>
                  {/* <Col>
                    <label>Pcs</label>
                    <Container className="measure_conatiner ">
                      <input
                        value={items.pcs || ""}
                        onChange={handleChange}
                        name="pcs"
                        placeholder="Pcs"
                        min="0"
                        type="number"
                        required
                      />
                    </Container>
                  </Col> */}
                  <Col>
                    <label>Guard Film</label>
                    <select
                      aria-label="Default select example"
                      name="guardfilm"
                      onChange={handleChange}
                      value={items.guardfilm || ""}
                      className="w-100"
                      required
                    >
                      {Constants.Guard.map((val, arr) => (
                        <option value={val.id} key={arr}>
                          {val.name}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col>
                    <label>Weight</label>
                    <Container className="measure_conatiner">
                      <input
                        value={items.weight || ""}
                        onChange={handleChange}
                        name="weight"
                        placeholder="Weight"
                        min="0"
                        type="number"
                        required
                      />
                      <span className="py-2">kg</span>
                    </Container>
                  </Col>
                </Row>
              </Container>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Container
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "grid",
              }}
            >
              <Row>
                <Col>
                  <button className="model_button" type="submit">
                    {loading ? (
                      <LoaderComp
                        type={"Oval"}
                        height={40}
                        color={"#0e2434"}
                        hidden={true}
                      />
                    ) : (
                      "Create Stocks"
                    )}
                  </button>
                </Col>
              </Row>
            </Container>
          </Modal.Footer>
        </form>





        
      </Modal>
      {/* ADD USERMODEL END */}
      <EditModal
        setLgEditShow={setLgEditShow}
        id={modalValue}
        lgEditShow={lgEditShow}
      />

      {/* EDIT MODEL STARTS */}
      {/* EDIT MODEL ENDS */}

      {/* STCOKS MAIN CONTAINER START */}
      <Container fluid className="outer_most_container">
        {/* Heading Section */}
        <Container className="d-flex">
          <Container
            className="heading_section d-flex"
            style={{ justifyContent: "left", display: "grid" }}
          >
            <h3 className="">Stocks</h3>

            <span className="mx-3">
              Total weight:{" "}
              {weight === null ? "0" : `${Math.floor(weight.totalweight)} Kg`}
            </span>
          </Container>
          <Container
            className=""
            style={{
              justifyContent: "right",
              display: "grid",
            }}
          >
            <button
              className="addStock_button"
              value="Submit"
              onClick={() => setLgShow(true)}
            >
              Add Stock
            </button>
          </Container>
        </Container>

        <Container className="searchContainer py-2 col-lg-4 mt-4 col-md-8">
          <input
            className="me-auto searchInput"
            ref={inputElement}
            type="text"
            placeholder="Search by Company product"
            value={searchTerm}
            onChange={getSearchTerm}
          />
          <i className="fas fa-search"></i>
        </Container>
      <Container>
  <table className="table col-lg-12 col-sm-12 col-xs-12 col-md-12">
    <thead style={{ backgroundColor: "#cddde8" }}>
      <tr>
        <th style={{ color: "black", borderRight: "1px solid lightgray" }}>Product</th>
        <th style={{ color: "black", borderRight: "1px solid lightgray" }}>Company</th>
        <th style={{ color: "black", borderRight: "1px solid lightgray" }}>Grade</th>
        <th style={{ color: "black", borderRight: "1px solid lightgray" }}>Top color</th>
        <th style={{ color: "black", borderRight: "1px solid lightgray" }}>Coating</th>
        <th style={{ color: "black", borderRight: "1px solid lightgray" }}>Temper</th>
        <th style={{ color: "black", borderRight: "1px solid lightgray" }}>Guardfilm</th>
        <th style={{ color: "black", borderRight: "1px solid lightgray" }}>Thickness</th>
        <th style={{ color: "black", borderRight: "1px solid lightgray" }}>Width</th>
        <th style={{ color: "black", borderRight: "1px solid lightgray" }}>Length</th>
        <th style={{ color: "black", borderRight: "1px solid lightgray" }}>Weight</th>
      
        <th style={{ color: "black", borderRight: "1px solid lightgray" }}>Action</th>
      </tr>
    </thead>
    <tbody>
  {(searchResults.length > 0 || item.length > 0) &&
    (searchTerm.length < 1 ? item : searchResults).map((val, index) => (
      <tr key={index}>
        <td style={{ backgroundColor: "#f5fafd" }}>{val.product}</td>
        <td style={{ backgroundColor: "#f2f2f2" }}>{val.company}</td>
        <td style={{ backgroundColor: "#f2f2f2" }}>{val.grade}</td>
        <td style={{ backgroundColor: "#f5fafd" }}>{val.topcolor}</td>
        <td style={{ backgroundColor: "#f2f2f2" }}>{val.coating}</td>
        <td style={{ backgroundColor: "#f5fafd" }}>{val.temper}</td>
        <td style={{ backgroundColor: "#f2f2f2" }}>{val.guardfilm}</td>
        <td style={{ backgroundColor: "#f5fafd" }}>{val.thickness}</td>
        <td style={{ backgroundColor: "#f2f2f2" }}>{val.width}</td>
        <td style={{ backgroundColor: "#f5fafd" }}>{val.length}</td>
        <td style={{ backgroundColor: "#f2f2f2" }}>
          {Math.sign(val.weight) === -1 || val.weight <= 0 ? (
            <span style={{ color: "red" }}>Out Of Stocks</span>
          ) : (
            <span>{val.weight.toFixed(0)} Kg</span>
          )}
        </td>
        <td style={{ backgroundColor: "#f2f2f2" }}>
          <div className="d-flex">
            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
                color: "red",
                marginRight: "10px",
              }}
              onClick={(e) => handleConfirm(val.id, e)}
            >
              <i className="far fa-trash-alt"></i>
            </button>
            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
                color: "blue",
              }}
              onClick={() => ChangeEditShow(val._id)}
            >
              <i className="far fa-edit"></i>
            </button>
          </div>
        </td>
      </tr>
    ))}
</tbody>

  </table>
</Container>

      </Container>
      {/* STOCKS MAIN CONTAINER END */}
    </div>
  );
};

export default Stocks;
