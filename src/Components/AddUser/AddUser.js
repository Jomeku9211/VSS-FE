import React, { useState } from "react";
import "./AddUser.css";
import { Container, Col, Row, Modal, Alert } from "react-bootstrap";
import UserProfile from "./UserProfile";
import LoaderComp from "../Loader/LoaderComp";
import Axios from "axios";
import Secret from "../config"

const AddUser = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [real, setReal] = useState({
    ProfileImage: "",
  });
  const handleClose = (e) => {
    e.preventDefault();
    setShow(false);
    // setImage({ user_image: null });
  };
  const handleShow = () => setShow(true);
  const [failureAlert, setFailureAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  const [input, setInput] = useState({
    UserName: "",
    LastName: "",
    Phone: "",
    Role: "",
    CurrentDate: "",
    Tenure: "",
    Password: "",
  });
  const [image, setImage] = useState({
    ProfileImage: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleFile = (e) => {
    e.preventDefault();
    setImage({ ProfileImage: e.target.files[0] });
    setReal({ ProfileImage: URL.createObjectURL(e.target.files[0]) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("UserName", input.UserName);
      formData.append("LastName", input.LastName);
      formData.append("Tenure", input.Tenure);
      formData.append("Password", input.Password);
      formData.append("Phone", input.Phone);
      formData.append("CurrentDate", input.CurrentDate);
      formData.append("Role", input.Role);
      formData.append("ProfileImage", image.ProfileImage);

      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7Il9pZCI6IjYwM2IzNDM5MzViODI2MjBhMDg5ZTkwNyIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIn0sImlhdCI6MTYxNTg5MTU2MSwiZXhwIjoxNjE1OTc3OTYxfQ.exU8x5APvJBqlVKtIHHSYrqXMNKu38GyusySo-ZxCp4";
      await Axios.post(
        `${Secret.Ip}/mobile/MobileReg`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        }
      ).then((response) => {
        if (response.status === 200) {
          setLoading(false);
          setSuccessAlert(true);
          console.log("success ", response);
          e.target.reset(); 
          window.location.reload(); 
        } else {
          setLoading(false);
          setFailureAlert(true);
          setTimeout(() => {
            setFailureAlert(false);
          }, 2000);
        }
      });
    } catch (error) {
      setFailureAlert(true);
      setTimeout(() => {
        setFailureAlert(false);
      }, 2000);
    }
  };

  return (
    <>
      <Modal
        size="lg"
        className="modal"
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Header className="modal_header">
          <Container>
            <Row>
              <div>
                <Alert
                  className=""
                  show={successAlert}
                  onClose={() => setSuccessAlert(false)}
                  variant="success"
                  dismissible
                  style={{
                    height: "auto",
                    textAlign: "center",
                  }}
                >
                  User Created SuccessFully
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
                  Something Went Worng Please try again later
                </Alert>
              </div>
            </Row>
            <Row>
              <Modal.Title className="modal_title ">Create User</Modal.Title>
            </Row>
          </Container>
        </Modal.Header>
        <form onSubmit={handleSubmit} autoComplete="off" autoCapitalize="true">
          <Modal.Body className="modal_body">
            <Container className="col-lg-12">
              <Row
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "grid",
                  marginBottom: "20px",
                }}
              >
                <Col>
                  {real?.ProfileImage ? (
                    <img
                      src={real?.ProfileImage}
                      alt="profilePic"
                      style={{
                        height: "100px",
                        width: "100px",
                        borderRadius: "50%",
                        border: "6px solid lightgrey",
                        boxShadow: "0px 2px 6px grey",

                      }}
                    />
                  ) : (
                    <div></div>
                  )}
                </Col>
              </Row>
              <Row>
                <Col>
                  <input
                    type="text"
                    name="UserName"
                    className="modal_input"
                    placeholder="First Name"
                    onChange={handleChange}
                    value={input.UserName}
                    required
                    maxLength="20"
                  />
                </Col>
                <Col>
                  <input
                    type="text"
                    name="LastName"
                    className="modal_input"
                    placeholder="Last Name"
                    onChange={handleChange}
                    value={input.LastName}
                    required
                    maxLength="20"
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <input
                    type="number"
                    name="Phone"
                    className="modal_input"
                    placeholder="Phone No."
                    onChange={handleChange}
                    value={input.Phone}
                    required
                    maxLength="10"
                  />
                  <div>
                    {input.Phone.length > 1 &&
                      (input.Phone.length < 10 ||
                        input.Phone.length > 10) && (
                        <span style={{ color: "red" }}>
                          * Must be of 10 digits
                        </span>
                      )}
                  </div>
                </Col>
                <Col>
                  <input
                    type="text"
                    name="Tenure"
                    className="modal_input"
                    placeholder="Tenure"
                    onChange={handleChange}
                    value={input.Tenure}
                    required
                    maxLength="20"
                    autoComplete="username"

                  />
                </Col>
              </Row>

              <Row className="mt-2">
                <Col>
                  <select
                    className="form-select modal_input"
                    aria-label="Default select example"
                    onChange={handleChange}
                    value={input.Role}
                    name="Role"
                    required
                  >
                    <option className="defaultSelect">Role</option>
                    <option value="salesManager">SalesManager</option>
                    <option value="ProductionHead">ProductionHead</option>
                    <option value="ProductionIncharge">ProductionIncharge</option>
                    <option value="Dispatchmanager">DispatchManager </option>
                  </select>
                </Col>

                <Col>
                  <input
                    type="date"
                    name="CurrentDate"
                    className="modal_input"
                    placeholder="Joined Date"
                    onChange={handleChange}
                    value={input.CurrentDate}
                    required
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col className="col-lg-6 col-xl-6 col-md-6 col-sm-6phone">
                  <input
                    type="password"
                    name="Password"
                    className="modal_input"
                    placeholder="Password"
                    onChange={handleChange}
                    value={input.Password}
                    required
                    autoComplete="current-password"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="file_container">
                    <input
                      type="file"
                      name="ProfileImage"
                      onChange={handleFile}
                      accept="image/*"
                      id="file"
                      defaultValue={image.ProfileImage}
                    />
                    <div style={{ textAlign: 'center', color: 'red' }}>
                      <p>Please provide a PNG, JPG, or JPEG file.</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer className="modal_footer">
            <button
              className="close_button"
              variant="secondary"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              disbaled="true"
              style={{ height: "auto", minHeight: "45px" }}
              className="submit_button"
              variant="primary"
              type="submit"
            >
              {loading ? (
                <LoaderComp
                  type={"Circles"}
                  hidden={true}
                  height={30}
                  color={"white"}
                />
              ) : (
                "Create User"
              )}
            </button>
          </Modal.Footer>
        </form>
      </Modal>
      <Container className="my-4">
        <Row>
          <div className="d-flex">
            <h4>Users</h4>
            <button className="add_btn ms-auto" onClick={handleShow}>

              <i className="fas fa-plus me-2">AddUser</i>
            </button>
          </div>
        </Row>
        <Row>
          <UserProfile />
        </Row>
      </Container>
    </>
  );
};

export default AddUser;