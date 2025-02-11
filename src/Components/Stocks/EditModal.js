import React, { useEffect, useState } from "react";
import { Container, Col, Row, Modal } from "react-bootstrap";
import LoaderComp from "../Loader/LoaderComp";
import Axios from "axios";
import Success from "../Alert/Success";
import Failure from "../Alert/Failure";
import secret from "../config";

const EditModal = ({ lgEditShow, setLgEditShow, id }) => {
  const [item, setItem] = useState({
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
  const [loading, setLoading] = useState(false);
  const [successfull, setSuccessfull] = useState(false);
  const [failure, setFailure] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  // const handleChange = (e) => {
  //   setItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  const formData = {
    product: item?.product,
    company: item?.company,
    temper: item?.temper,
    grade: item?.grade,
    topcolor: item?.topcolor,
    thickness: parseInt(item?.thickness),
    width: parseInt(item?.width),
    length: parseInt(item?.length),
    coating: parseInt(item?.coating),
    weight: parseInt(item?.weight),
    pcs: parseInt(item?.pcs),
    guardfilm: item?.guardfilm,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          // Check if id exists
          const response = await Axios.get(`${secret.Ip}/Stock_M/getby/${id}`, {
            headers: {
              Authorization: `Bearer ${secret.token}`,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          });

        //   if (response?.data?.res) {
        //     setItem(response.data.res); // Ensure data exists before setting state
        //     console.log("Fetched Item:", response.data.res);
        //   } else {
        //     console.error("No data found for this ID");
        //   }
        // } catch (error) {
        //   console.error("Fetch Error:", error.message);
        // }
          console.log(response);
          const values = response?.data.res;
          console.log("value", values);
          setItem(values);
          console.log("item", item);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]); // Add id as a dependency

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setTimeout(async () => {
        await Axios.put(`${secret.Ip}/Stock_M/edit/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${secret.token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }).then((response) => {
          if (response.status === 200) {
            setLoading(false);
            setSuccessfull(true);
            window.location.reload();
          }
        });
        setTimeout(() => {
          setSuccessfull(false);
        }, 3000);
      });
    } catch (error) {
      setLoading(false);
      setFailure(true);
      setTimeout(() => {
        setFailure(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (lgEditShow) {
      const modal = document.querySelector('.modal');
      if (modal) {
        modal.style.zIndex = 1050;
      }
    }
  }, [lgEditShow]);
  

  return (
    <Modal
      size="lg"
      show={lgEditShow}
      onHide={() => setLgEditShow(false)}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Success
          show={successfull}
          variant={"success"}
          message={"Stocks Updated Successfully"}
        />
        <Failure
          show={failure}
          variant={"danger"}
          message={"OOoops!!..something Went Wrong"}
        />
        <Modal.Title id="example-modal-sizes-title-lg">
          Update Stocks
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Modal.Body>
          <Container
            fluid
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "block",
            }}
          >
            <Container className="d-flex-grow">
              <Row className="mb-3">
                <Col className="col-lg-6 col-xl-6 col-sm-5 col-md-6">
                  <select
                    name="product"
                    className="w-100"
                    onChange={handleChange}
                    // required
                  >
                    <option value>{item?.product}</option>
                    <option value="GC Coil">GC Coil</option>
                    <option value="GP Coil">GP Coil</option>
                    <option value="GPC">GPC</option>
                    <option value="GC">GC</option>
                    <option value="HR">HR</option>
                    <option value="CR">CR</option>
                    <option value="Color Coil">Color Coil</option>
                    <option value="GC Sheet">GC Sheet</option>
                    <option value="GP Sheet">GP Sheet</option>
                    <option value="Profile Sheet">Profile Sheet</option>
                    <option value="Acce">Acce.</option>
                  </select>
                </Col>
                <Col className="col-lg-6 col-xl-6 col-sm-5 col-md-6">
                  <select
                    name="company"
                    className="w-100"
                    onChange={handleChange}
                    required
                  >
                    <option value>{item?.company}</option>
                    <option value="NA">NA</option>
                    <option value="NSAIL">NSAIL</option>
                    <option value="JSW">JSW</option>
                    <option value="UTTAM">UTTAM</option>
                    <option value="AMNS">AMNS</option>
                    <option value="ESSAR">ESSAR</option>
                    <option value="SAIL">SAIL</option>
                    <option value="TATA">TATA</option>
                    <option value="ASIAN Inventory">ASIAN Inventory</option>
                  </select>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row className="mb-3">
                <Col className="col-lg-6 col-xl-6 col-sm-5 col-md-6">
                  <select
                    name="grade"
                    onChange={handleChange}
                    className="w-100"
                    required
                  >
                    <option value>{item?.grade}</option>
                    <option value="">NA</option>
                    <option value="PRIME">PRIME</option>
                    <option value="SECOND">SECOND</option>
                    <option value="DEFECTIVE">DEFECTIVE</option>
                    <option value="TEST">TEST</option>
                  </select>
                </Col>
                <Col className="col-lg-6 col-xl-6 col-sm-5 col-md-6">
                  <select
                    name="topcolor"
                    onChange={handleChange}
                    className="w-100"
                    required
                  >
                    <option value>{item?.topcolor}</option>
                    <option value="REG">REG</option>
                    <option value="SP">SP</option>
                    <option value="TL">TL</option>
                    <option value="BLUE">BLUE</option>
                    <option value="WHITE">WHITE</option>
                    <option value="SECO RED">SECO RED</option>
                    <option value="BRICK RED">BRICK RED</option>
                    <option value="YEllOW">YEllOW</option>
                    <option value="DARK GREY">DARK GREY</option>
                    <option value="LIGHT GREY">LIGHT GREY</option>
                    <option value="ENVIR GREEN">ENVIR GREEN</option>
                    <option value="ROYAL BLUE">ROYAL BLUE</option>
                  </select>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row className="mb-3">
                <Col className="col-lg-6 col-xl-6 col-sm-5 col-md-6">
                  <select
                    name="coating"
                    onChange={handleChange}
                    className="w-100"
                    required
                  >
                    <option value>{item?.coating}</option>
                    <option value="">NA</option>
                    <option value="70">70</option>
                    <option value="80">80</option>
                    <option value="90">90</option>
                    <option value="120">120</option>
                    <option value="150">150</option>
                    <option value="180">180</option>
                    <option value="275">275</option>
                  </select>
                </Col>
                <Col className="col-lg-6 col-xl-6 col-sm-5 col-md-6">
                  <select
                    name="temper"
                    onChange={handleChange}
                    className="w-100"
                    required
                  >
                    <option value>{item?.temper}</option>
                    <option value="Full Hard">Full Hard</option>
                    <option value="Semi Hard">Semi Hard</option>
                    <option value="Soft">Soft</option>
                    <option value="Extra Soft">Extra Soft</option>
                    <option value="DD">DD</option>
                    <option value="EDD">EDD</option>
                    <option value="2062">2062</option>
                    <option value="1079">1079</option>
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
                      name="thickness"
                      placeholder="thickness"
                      type="number"
                      // required
                      value={item?.thickness}
                      onChange={handleChange}
                    />
                  </Container>
                </Col>
                <Col>
                  <label>Width</label>
                  <Container className="measure_conatiner">
                    <input
                      name="width"
                      placeholder="width"
                      type="number"
                      // required
                      value={item?.width}
                      onChange={handleChange}
                    />
                  </Container>
                </Col>
                <Col>
                  <label>length</label>
                  <Container className="measure_conatiner">
                    <input
                      name="length"
                      placeholder="length"
                      type="number"
                      // required
                      value={item?.length}
                      onChange={handleChange}
                    />
                  </Container>
                </Col>
              </Row>
            </Container>
            <Container className="mt-3">
              <Row>
                <Col>
                  <label>Pcs</label>
                  <Container className="measure_conatiner">
                    {/* <span className="py-2">mm</span> */}
                    <input
                      name="pcs"
                      placeholder="pcs"
                      type="number"
                      // required
                      value={item?.pcs}
                      onChange={handleChange}
                    />
                  </Container>
                </Col>
                <Col>
                  <label>Guard Film</label>
                  <select
                    aria-label="Default select example"
                    name="guardfilm"
                    onChange={handleChange}
                    className="w-100"
                    // required
                  >
                    <option value>{item?.guardfilm}</option>
                    <option value="">NA</option>
                    <option value="Without">Without</option>
                    <option value="SkyLine">Skyline</option>
                    <option value="Hindustan">Hindustan</option>
                    <option value="Asia">Asian</option>
                    <option value="Rangoli">Rangoli</option>
                  </select>
                </Col>
                <Col>
                  <label>Weight</label>
                  <Container className="measure_conatiner">
                    <input
                      name="weight"
                      placeholder="Weight"
                      min="0"
                      type="number"
                      required
                      value={item?.weight}
                      onChange={handleChange}
                    />
                    <span className="py-2">kg</span>
                  </Container>
                </Col>23
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
                <button
                  className="model_button"
                  type="submit"
                  onClick={() => setLgEditShow(false)}
                >
                  Close
                </button>
              </Col>
              <Col>
                <button className="model_button" type="submit">
                  {loading ? (
                    <LoaderComp
                      height={30}
                      type={"TailSpin"}
                      color={"white"}
                      hidden={true}
                    />
                  ) : (
                    "Update"
                  )}
                </button>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default EditModal;
