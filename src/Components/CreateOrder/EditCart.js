import React from 'react'

const EditCart = () => {
  return (
    <div>
      <h1>hsvdhs</h1>
    </div>
  )
}

export default EditCart


// import { useEffect, useState } from "react";
// import Constants from "../constants";
// import "./CreateOrder.css";
// import { Container, Col, Row, Badge, Form, Alert } from "react-bootstrap";
// import Axios from "axios";
// import Success from "../Alert/Success";
// import Failure from "../Alert/Failure";
// import Secret from '../config'


// const EditCart = ({ onClose, productId }) => {

//   const [prev, setPrev] = useState({
//     company: "",
//     grade: "",
//     color: "",
//     coating: "",
//     temper: "",
//     guard: "",
//     thickness: "",
//     width: "",
//     length: "",
//     pcs: "",
//     rate: "",
//     gst: "",
//     selectedUnit: "piece"
//   })

//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     // const { name, value } = e.target;
//     // setProductData({
//     //   ...productData,
//     //   [name]: value
//     // });
//     e.preventDefault();
//     setPrev({ ...prev, [e.target.name]: e.target.value });
//   }

//   const productData = {
//     company: prev?.company,
//     grade: prev?.grade,
//     color: prev?.color,
//     coating: prev?.coating,
//     temper: prev?.temper,
//     guard: prev?.guard,
//     thickness: prev?.thickness,
//     width: prev?.width,
//     length: prev?.length,
//     pcs: prev?.pcs,
//     rate: prev?.rate,
//     gst: prev?.gst,
//   }

//   useEffect(() => {
//     const fetchProductData = async () => {
//       try {

//         if (!productId) {
//           console.log("Error:",productId);
//         }

//         const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7Il9pZCI6IjYwNTFkMDBkZWRhN2RkYTIwOWJmZjY2NyIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6IjIxMjMyZjI5N2E1N2E1YTc0Mzg5NGEwZTRhODAxZmMzIn0sImlhdCI6MTYxNzYxNjE0NiwiZXhwIjoxNjE3NzAyNTQ2fQ.oMYd1wQIpCxxRlnl-XNX2oY2YYOlarjK3jk-SSOxdqw";

//         setLoading(true);
//          await Axios.get(`http://localhost:3000/sales/edit/${productId}`, {
//           headers: {
//             "Content-Type": "application/json",
//             "Access-Control-Allow-Origin": "*",
//           }
//         }).then((response) => {
//           console.log("response Edit Cart : ", response);
//           setPrev(response.data);
//           console.log("response Data Edit : ", response.data);
//           setLoading(false);
//         })   
//       } catch (err) {
//         console.log(err);
//         setLoading(false);
//         setError(true);
//         setTimeout(() => setError(false),  3000);
//       }
//     }
//     fetchProductData();
//   }, [productId])





//   const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         setLoading(true);

//         const token =
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7Il9pZCI6IjYwM2IzNDM5MzViODI2MjBhMDg5ZTkwNyIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIn0sImlhdCI6MTYxNTg5MTU2MSwiZXhwIjoxNjE1OTc3OTYxfQ.exU8x5APvJBqlVKtIHHSYrqXMNKu38GyusySo-ZxCp4";
      

//         const response = await Axios.put(
//           `${Secret.Ip}/sales/edit/${productId}`,
//           productData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//               "Access-Control-Allow-Origin": "*",
//             }
//           }
//         );
//         console.log("Edit Cart API Response:", response);

//         if (response.status === 200 ){
//           setSuccess(true);
//           setTimeout(() => setSuccess(false), 3000);
//           onClose();
//         }
//         setLoading(false);

//       } catch (err) {
//         console.log(err);
//         setError(true);
//         setLoading(false);
//         setTimeout(() => setError(false), 3000)
//       }
//   } 

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <Container>
//           <div className="EditOrder">
//             {success && <Success show={success} message="Product Update Successfully!" />}
//             {error && <Failure show={error} message="Error In Updating The Product!" />}
//             <Container className="insideEditOrder">
//               <form onSubmit={handleSubmit}>
//               <Row>
//                 <Col>
//                   <select
//                     name="company"
//                     className="inputSelect"
//                     aria-label="Default select example"
//                     onChange={handleChange}
//                     value={prev?.company}
//                     // value={company}
//                     // onChange={(e) => {
//                     //   setCompany(e.target.value);
//                     // }}
//                   >
//                     {Constants.Company.map((val, arr) => (
//                       <option value={val.id} key={arr}>
//                         {val.name}
//                       </option>
//                     ))}
//                   </select>
//                 </Col>
//                 <Col>
//                   <select
//                     name="grade"
//                     className="inputSelect"
//                     aria-label="Default select example"
//                     onChange={handleChange}
//                     value={prev?.grade}
//                     // value={grade}
//                     // onChange={(e) => {
//                     //   setGrade(e.target.value);
//                     // }}
//                   >
//                     {Constants.Grade.map((val, arr) => (
//                       <option value={val.id} key={arr}>
//                         {val.name}
//                       </option>
//                     ))}
//                   </select>
//                 </Col>
//                 <Col>
//                   <select
//                     name="color"
//                     className="inputSelect"
//                     aria-label="Default select example"
//                     onChange={handleChange}
//                     value={prev?.color}
//                     // value={color}
//                     // onChange={(e) => setColor(e.target.value)}
//                   >
//                     {Constants.Color.map((val, arr) => (
//                       <option value={val.id} key={arr}>
//                         {val.name}
//                       </option>
//                     ))}
//                   </select>
//                 </Col>
//               </Row>
//               <Row className="mt-3">
//                 <Col>
//                   <select
//                   name="coating"
//                     className="inputSelect"
//                     aria-label="Default select example"
//                     onChange={handleChange}
//                     value={prev?.coating}
//                     // onChange={(e) => setCoating(e.target.value)}
//                     // value={coating}
//                   >
//                     as
//                     {Constants.Coating.map((val, arr) => (
//                       <option value={val.id} key={arr}>
//                         {val.name}
//                       </option>
//                     ))}
//                   </select>
//                 </Col>
//                 <Col>
//                   <select
//                     name="temper"
//                     className="inputSelect"
//                     aria-label="Default select example"
//                     onChange={handleChange}
//                     value={prev?.temper}
//                     // onChange={(e) => setTemper(e.target.value)}
//                     // value={temper}
//                   >
//                     {Constants.Temper.map((val, arr) => (
//                       <option value={val.id} key={arr}>
//                         {val.name}
//                       </option>
//                     ))}
//                   </select>
//                 </Col>
//                 <Col>
//                   <select
//                     name="guard"
//                     className="inputSelect"
//                     aria-label="Default select example"
//                     onChange={handleChange}
//                     value={prev?.guard}
//                     // onChange={(e) => setGuard(e.target.value)}
//                     // value={guard}
//                   >
//                     {Constants.Guard.map((val, arr) => (
//                       <option value={val.id} key={arr}>
//                         {val.name}
//                       </option>
//                     ))}
//                   </select>
//                 </Col>
//               </Row>
//             {/* </Container> */}
//             <Container className="cartSubInputs">
//               <Container className="insideInputs">
//                 <Row>
//                   <Col className="m-2">
//                     <Row>
//                       <label htmlFor="thick">Thickness</label>
//                       <input
//                         type="text"
//                         name="thickness"
//                         className="custom_input"
//                         id="thickness"
//                         placeholder="thickness"
//                         onChange={handleChange}
//                         value={prev?.thickness}
//                         // onChange={(e) => {
//                         //   setDesc({
//                         //     ...desc,
//                         //     thickness: e.target.value,
//                         //   });
//                         //   setThickness(e.target.value);
//                         // }}
//                         // value={thickness}
//                       ></input>
//                     </Row>
//                   </Col>

//                   <Col className="m-2">
//                     <Row>
//                       <label htmlFor="thick">Width</label>

//                       <input
//                         name="width"
//                         className="custom_input"
//                         type="text"
//                         placeholder="width"
//                         onChange={handleChange}
//                         value={prev?.width}
//                         // value={width}
//                         // onChange={(e) => {
//                         //   setDesc({
//                         //     ...desc,
//                         //     width: e.target.value,
//                         //   });
//                         //   setWidth(e.target.value);
//                         // }}
//                       ></input>
//                     </Row>
//                   </Col>
//                 </Row>
//                 <Row>
//                   {/* {orderList.map((singleOrder, index) => { */}
//                   {/* // return ( */}
//                   <div style={{ display: "flex" }}>
//                     <Col className="m-3">
//                       <Row>
//                         <label htmlFor="length">Length</label>
//                         <input
//                           style={{ width: "150px" }}
//                           id="weight"
//                           type="text"
//                           placeholder="length"
//                           name="length"
//                           className="subfields"
//                           onChange={handleChange}
//                           value={prev?.length}
//                           // onChange={(e) => {
//                           //   setDesc({
//                           //     ...desc,
//                           //     length: e.target.value,
//                           //   });
//                           //   setLength(e.target.value);
//                           // }}
//                           // value={length}
//                         />
//                       </Row>
//                     </Col>
//                     <Col className="m-3" style={{ display: "flex" }}>
//                       <Row>
//                         <label htmlFor="pcs" style={{ marginLeft: "10px" }}>
//                           Pcs.
//                         </label>
//                         <input
//                           style={{
//                             marginLeft: "10px",
//                             width: "150px",
//                           }}
//                           id="pcs"
//                           type="text"
//                           placeholder="Pcs"
//                           name="pcs"
//                           onChange={handleChange}
//                           value={prev?.pcs}
//                           // value={pcs}
//                           // onChange={(e) => {
//                           //   setDesc({
//                           //     ...desc,
//                           //     pcs: e.target.value,
//                           //   });
//                           //   setPcs(e.target.value);
//                           // }}
//                           className="subfields"
//                           // required
//                         />
//                         {/* {desc.pcs.length === 0 && ( */}
//                         <span
//                           style={{
//                             color: "red",
//                             marginLeft: "10px",
//                           }}
//                         >
//                           *Required
//                         </span>
//                         {/* )} */}
//                       </Row>
//                       <Row>
//                         <select
//                           className="pcsInput"
//                           aria-label="Default select example"
//                           // value={selectedUnit}
//                           // onChange={(e) => setSelectedUnit(e.target.value)}
//                         >
//                           <option value="piece">piece</option>
//                           <option value="kg">kg</option>
//                         </select>
//                       </Row>
//                     </Col>

//                     <Col className=""></Col>
//                   </div>
//                   {/* // ); */}
//                   {/* // })} */}
//                 </Row>
//                 <Row>
//                   <p id="weight">
//                     TotalWeight:
//                     <span id="result">Total Weight</span>
//                   </p>
//                 </Row>
//               </Container>
//             </Container>
//             {/* <Container className="" style={{ marginLeft: "1.5rem" }}> */}
//               <Row>
//                 <Col className="m-3">
//                   <Row>
//                     <label htmlFor="thickness">Rate(Basic)</label>
//                     <input
//                       name="rate"
//                       type="text"
//                       // required
//                       // value={rate || ""}
//                       // onChange={handleRate}
//                       placeholder="Rate"
//                       className="subfields"
//                       onChange={handleChange}
//                       value={prev?.rate}
//                     />
//                   </Row>
//                 </Col>
//                 <Col className="m-3">
//                   <Row>
//                     <label htmlFor="thickness">Rate(GST%)</label>
//                     <input
//                       type="text"
//                       name="gst"
//                       // value={total || ""}
//                       placeholder="Gst"
//                       className="subfields"
//                       readOnly
//                       maxLength="20"
//                       onChange={handleChange}
//                       value={prev?.gst}
//                     />
//                   </Row>
//                 </Col>
//                 <Col className="m-3">
//                   <Row>
//                     <select
//                       className="gstDropDown"
//                       aria-label="Default select example"
//                       onChange={handleChange}
//                       // value={productData.selectedg}
//                       // value={selectedGst}
//                       // onChange={(e) => setSelectedGst(e.target.value)}
//                     >
//                       <option value="basic">Basic</option>
//                       <option value="paid">Paid</option>
//                     </select>
//                   </Row>
//                 </Col>
//               </Row>
//               <div className="updateCartButtons">

//                 <button type="submit" disabled={loading}>
//                   { loading ? "Updating..." : "Update" }
//                 </button>
//                 <button type="button" onClick={onClose}>Close</button>
//               </div>
//               </form>
//             </Container>
//           </div>
//         </Container>
//       </div>
//     </div>
//   );
// };

// export default EditCart;
