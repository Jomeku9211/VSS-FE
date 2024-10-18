import Constants from "../constants";
import "./CreateOrder.css";
import { Container, Col, Row, Badge, Form, Alert } from "react-bootstrap";

const EditCart = () => {
  return (
    <div className="modal">
      <div className="modal-content">
        <Container>
          <div className="EditOrder">
            <Container className="insideEditOrder">
              <Row>
                <Col>
                  <select
                    className="inputSelect"
                    aria-label="Default select example"
                    // value={company}
                    // onChange={(e) => {
                    //   setCompany(e.target.value);
                    // }}
                  >
                    {Constants.Company.map((val, arr) => (
                      <option value={val.id} key={arr}>
                        {val.name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col>
                  <select
                    className="inputSelect"
                    aria-label="Default select example"
                    // value={grade}
                    // onChange={(e) => {
                    //   setGrade(e.target.value);
                    // }}
                  >
                    {Constants.Grade.map((val, arr) => (
                      <option value={val.id} key={arr}>
                        {val.name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col>
                  <select
                    className="inputSelect"
                    aria-label="Default select example"
                    // value={color}
                    // onChange={(e) => setColor(e.target.value)}
                  >
                    {Constants.Color.map((val, arr) => (
                      <option value={val.id} key={arr}>
                        {val.name}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <select
                    className="inputSelect"
                    aria-label="Default select example"
                    // onChange={(e) => setCoating(e.target.value)}
                    // value={coating}
                  >
                    as
                    {Constants.Coating.map((val, arr) => (
                      <option value={val.id} key={arr}>
                        {val.name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col>
                  <select
                    className="inputSelect"
                    aria-label="Default select example"
                    // onChange={(e) => setTemper(e.target.value)}
                    // value={temper}
                  >
                    {Constants.Temper.map((val, arr) => (
                      <option value={val.id} key={arr}>
                        {val.name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col>
                  <select
                    className="inputSelect"
                    aria-label="Default select example"
                    // onChange={(e) => setGuard(e.target.value)}
                    // value={guard}
                  >
                    {Constants.Guard.map((val, arr) => (
                      <option value={val.id} key={arr}>
                        {val.name}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>
            </Container>
            <Container className="cartSubInputs">
              <Container className="insideInputs">
                <Row>
                  <Col className="m-2">
                    <Row>
                      <label htmlFor="thick">Thickness</label>
                      <input
                        type="text"
                        className="custom_input"
                        id="thickness"
                        placeholder="thickness"
                        // onChange={(e) => {
                        //   setDesc({
                        //     ...desc,
                        //     thickness: e.target.value,
                        //   });
                        //   setThickness(e.target.value);
                        // }}
                        // value={thickness}
                      ></input>
                    </Row>
                  </Col>

                  <Col className="m-2">
                    <Row>
                      <label htmlFor="thick">Width</label>

                      <input
                        className="custom_input"
                        type="text"
                        placeholder="width"
                        // value={width}
                        // onChange={(e) => {
                        //   setDesc({
                        //     ...desc,
                        //     width: e.target.value,
                        //   });
                        //   setWidth(e.target.value);
                        // }}
                      ></input>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  {/* {orderList.map((singleOrder, index) => { */}
                  {/* // return ( */}
                  <div style={{ display: "flex" }}>
                    <Col className="m-3">
                      <Row>
                        <label htmlFor="length">Length</label>
                        <input
                          style={{ width: "150px" }}
                          id="weight"
                          type="text"
                          placeholder="length"
                          name="weight"
                          className="subfields"
                          // onChange={(e) => {
                          //   setDesc({
                          //     ...desc,
                          //     length: e.target.value,
                          //   });
                          //   setLength(e.target.value);
                          // }}
                          // value={length}
                        />
                      </Row>
                    </Col>
                    <Col className="m-3" style={{ display: "flex" }}>
                      <Row>
                        <label htmlFor="pcs" style={{ marginLeft: "10px" }}>
                          Pcs.
                        </label>
                        <input
                          style={{
                            marginLeft: "10px",
                            width: "150px",
                          }}
                          id="pcs"
                          type="text"
                          placeholder="Pcs"
                          name="pcs"
                          // value={pcs}
                          // onChange={(e) => {
                          //   setDesc({
                          //     ...desc,
                          //     pcs: e.target.value,
                          //   });
                          //   setPcs(e.target.value);
                          // }}
                          className="subfields"
                          // required
                        />
                        {/* {desc.pcs.length === 0 && ( */}
                        <span
                          style={{
                            color: "red",
                            marginLeft: "10px",
                          }}
                        >
                          *Required
                        </span>
                        {/* )} */}
                      </Row>
                      <Row>
                        <select
                          className="pcsInput"
                          aria-label="Default select example"
                          // value={selectedUnit}
                          // onChange={(e) => setSelectedUnit(e.target.value)}
                        >
                          <option value="piece">piece</option>
                          <option value="kg">kg</option>
                        </select>
                      </Row>
                    </Col>

                    <Col className=""></Col>
                  </div>
                  {/* // ); */}
                  {/* // })} */}
                </Row>
                <Row>
                  <p id="weight">
                    TotalWeight:
                    <span id="result">Total Weight</span>
                  </p>
                </Row>
              </Container>
            </Container>
            <Container className="" style={{ marginLeft: "1.5rem" }}>
              <Row>
                <Col className="m-3">
                  <Row>
                    <label htmlFor="thickness">Rate(Basic)</label>
                    <input
                      name="rate"
                      type="text"
                      // required
                      // value={rate || ""}
                      // onChange={handleRate}
                      placeholder="Rate"
                      className="subfields"
                    />
                  </Row>
                </Col>
                <Col className="m-3">
                  <Row>
                    <label htmlFor="thickness">Rate(GST%)</label>
                    <input
                      type="text"
                      name="gst"
                      // value={total || ""}
                      placeholder="Gst"
                      className="subfields"
                      readOnly
                      maxLength="20"
                    />
                  </Row>
                </Col>
                <Col className="m-3">
                  <Row>
                    <select
                      className="gstDropDown"
                      aria-label="Default select example"
                      // value={selectedGst}
                      // onChange={(e) => setSelectedGst(e.target.value)}
                    >
                      <option value="basic">Basic</option>
                      <option value="paid">Paid</option>
                    </select>
                  </Row>
                </Col>
              </Row>
              <div className="updateCartButtons">
                <button>Update</button>
                <button>Close</button>
              </div>
            </Container>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default EditCart;
