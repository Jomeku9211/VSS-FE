import React, { useEffect, useState } from "react";
import { Container, Col, Row, Modal } from "react-bootstrap";
import Axios from "axios";
import Success from "../Alert/Success";
import Failure from "../Alert/Failure";
import LoaderComp from "../Loader/LoaderComp";
import secret from '../config'


const EditModal = ({ show, setShow, id, refreshDataCallback }) => {
  const [prev, setPrev] = useState({
    UserName: "",
    LastName: "",
    Phone: "",
    Tenure: "",
    Role: "",
    CurrentDate: "",
    Password: "",
    ProfileImage: "", 
  });


  const [successfull, setSuccessfull] = useState(false);
  const [failure, setFailure] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setPrev({ ...prev, [e.target.name]: e.target.value });
  };
  const formData = {
    UserName: prev?.UserName,
    LastName: prev?.LastName,
    Role: prev?.Role,
    Phone: prev?.Phone,
    Tenure: prev?.Tenure,
    CurrentDate: prev?.CurrentDate,
    Password: prev?.Password,
    ProfileImage:prev?.ProfileImage

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Form data on submit ", prev);
  
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7Il9pZCI6IjYwM2IzNDM5MzViODI2MjBhMDg5ZTkwNyIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIn0sImlhdCI6MTYxNTg5MTU2MSwiZXhwIjoxNjE1OTc3OTYxfQ.exU8x5APvJBqlVKtIHHSYrqXMNKu38GyusySo-ZxCp4";
      const response = await Axios.patch(
        `${secret.Ip}/mobile/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log("API Response:", response);
  
      if (response.status === 200) {
        setLoading(false);
        setSuccessfull(true);
        setShow(false)
        refreshDataCallback();
      }
  
      setTimeout(() => {
        setSuccessfull(false);
      }, 3000);
    } catch (error) {
      setLoading(false);
      setFailure(true);
      setTimeout(() => {
        setFailure(false);
      }, 3000);
    }
  };

  
    useEffect(() => {
      const fetchData = async () => {
  
        try{
          if(!id){
            console.log("Error ",id)
          }
        const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7Il9pZCI6IjYwNTFkMDBkZWRhN2RkYTIwOWJmZjY2NyIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6IjIxMjMyZjI5N2E1N2E1YTc0Mzg5NGEwZTRhODAxZmMzIn0sImlhdCI6MTYxNzYxNjE0NiwiZXhwIjoxNjE3NzAyNTQ2fQ.oMYd1wQIpCxxRlnl-XNX2oY2YYOlarjK3jk-SSOxdqw";
          
        await Axios.get(`${secret.Ip}/mobile/getById/${id}`, {
          headers: {
      
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }).then((response) => {
          const userValue = response.data.message
          console.log("get data by id ", response.data.message);
          setPrev(userValue);
        });
      }
      catch(error){
       console.log(error)
      }
      };
      fetchData();
  },[id]);
  
   
  useEffect(() => {
    if (show) {
      const modal = document.querySelector('.modal');
      if (modal) {
        modal.style.zIndex = 1050;
      }
    }
  }, [show]);
  

  return (
    <>
      <Modal
        size="lg"
        className="modal"
        show={show}
        onHide={(e) => setShow(false)}>
        <Success
          show={successfull}
          variant={"success"}
          message={"User Updated Successfully"}
        />
        <Failure
          show={failure}
          variant={"danger"}
          message={"something Went Wrong"}
        />
        <Modal.Header className="modal_header">

        </Modal.Header>
        <form onSubmit={handleSubmit} autoComplete="off" autoCapitalize="true">
          <Modal.Body className="modal_body">
            <Container className="col-lg-12  ">
              <Row
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "grid",
                  marginBottom: "20px",
                }}
              >
                <Col>
                  {prev?.ProfileImage ? (
                    <img
                      src={prev?.ProfileImage}
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
                    value={prev?.UserName}
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
                    value={prev?.LastName}
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
                    value={prev?.Phone}
                    maxLength="20"
                  />
                  <div>
                    {prev?.Phone.length > 1 &&
                      (prev?.Phone.length < 10 ||
                        prev?.Phone.length > 10) && (
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
                    value={prev?.Tenure}
                    maxLength="20"
                  />
                </Col>
              </Row>

              <Row className="mt-2">
                <Col>
                  <select
                    className="form-select modal_input"
                    aria-label="Default select example"
                    onChange={handleChange}
                    value={prev?.Role}
                    name="Role"
                  >
                    <option className="defaultSelect">Role</option>
                    <option className="stockManager">StockManager</option>
                    <option value="salesManager">SalesManager</option>
                    <option value="ProductionHead">ProductionHead</option>
                    <option value="ProductionIncharge">ProductionIncharge</option>
                    <option value="Dispatchmanager">DispatchManager </option>
                  </select>
                </Col>

                {/* <Col>
                  <input
                    type="date"
                    name="CurrnetDate"
                    className="modal_input"
                    placeholder="Joined Date"
                    onChange={handleChange}
                    value={prev?.CurrentDate}
                    maxLength="20"
                  />
                </Col> */}
              </Row>
              <Row className="mt-2">
                <Col>
                  <div
                    className="col-lg-6 col-sm-6 col-md-6 col-xl-6"
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <input
                      type="password"
                      name="Password"
                      className="modal_input"
                      placeholder="Password"
                      onChange={handleChange}
                      value={prev?.Password}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer className="modal_footer">
            <button
              className="close_button"
              variant="secondary"
              onClick={(e) => {
                e.preventDefault(e);
                setShow(false);
                setLoading(false)
              }}
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
                "Update User"
              )}
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default EditModal;