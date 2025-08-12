import React, { useState, useEffect } from "react";
import qs from "qs";
import "./CreateOrder.css";
import { Container, Col, Row, Badge, Form, Alert } from "react-bootstrap";
import Axios from "axios";
import LoaderComp from "../Loader/LoaderComp";
import Constants from "../constants";
import secret from "../config";
import "../../Styles/Cart.css";



const CreateOrder = () => {
  const [checked, setChecked] = useState("");
  const [Weight2, setWeight2] = useState("")
  const [company, setCompany] = useState("");
  const [guard, setGuard] = useState("");
  const [color, setColor] = useState("");
  const [temper, setTemper] = useState("");
  const [grade, setGrade] = useState("");
  const [rate, setRate] = useState("");
  const [gst, setGst] = useState("");
  const [total, setTotal] = useState(0);
  const [coating, setCoating] = useState("");
  const [newProduct, setNewProduct] = useState([]);
  const [failureAlert, setFailureAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [totalWeight, setTotalWeight] = useState();

  const [thickness, setThickness] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [pcs, setPcs] = useState("");

  // Update the orderList state initialization to include lengthInMm
const [orderList, setOrderList] = useState([{ 
  orders: "", 
  lengthType: "feet",
  length: "",
  feet: "",
  inch: "",
  pcs: "",
  unit: "piece",
  lengthInMm: 0 
}]);
  const [cartItem, setCartItem] = useState([]);

  const [showCartItem, setShowCartItem] = useState(false);
  const [isCartEmpty, setISCartEmpty] = useState(cartItem.length === 0);

  const [selectedUnit, setSelectedUnit] = useState("piece");
  const [selectedGst, setSelectedGst] = useState("Basic");

  // const [showEdit, setShowEdit] = useState(false);
  // const [currentItem, setCurrentItem] = useState(null);


  // Add this helper function at the top of your component
const convertToMm = (feet, inches = 0) => {
  const totalInches = parseFloat(feet) * 12 + parseFloat(inches);
  return totalInches * 25.4; // 1 inch = 25.4 mm
};


// Add this helper function to calculate weight
const calculateWeight = (thickness, lengthInMm, width, pcs) => {
  const thicknessNum = parseFloat(thickness) || 0;
  const lengthNum = parseFloat(lengthInMm) || 0;
  const widthNum = parseFloat(width) || 0;
  const pcsNum = parseFloat(pcs) || 0;
  
  // Calculate weight using the formula: thickness * length * width * 0.00000785 * pcs
  const weight = thicknessNum * lengthNum * widthNum * 0.00000785 * pcsNum;
  return weight;
};



// Add this function to update order length and calculate mm
const updateOrderLength = (index, updates) => {
  const updatedOrders = [...orderList];
  const order = { ...updatedOrders[index], ...updates };
  
  // Recalculate lengthInMm based on the current lengthType and the updated values
  if (order.lengthType === "feet") {
    const feetValue = order.length || 0;
    order.lengthInMm = convertToMm(feetValue, 0);
  } else if (order.lengthType === "feetInch") {
    const feetValue = order.feet || 0;
    const inchesValue = order.inch || 0;
    order.lengthInMm = convertToMm(feetValue, inchesValue);
  }
  
  updatedOrders[index] = order;
  setOrderList(updatedOrders);
};

  let newArray = [];

  const handleOrderRemove = (index, e) => {
    const list = [...orderList];
    list.splice(index, 1);
    setOrderList(list);
  };


  const datemili = new Date();
  const miliseconds = datemili.getTime().toString();

  const [inputs, setInputs] = useState({
    firmName: "",
    Email: "",
    clientName: "",
    orderId: miliseconds,
    address: "",
    city: "",
    phone_no: "",
    deliveryDate: "",
    products: newArray,
  });

  const [desc, setDesc] = useState({
    thickness: "",
    length: "",
    width: "",
    pcs: "",
    weight: totalWeight,
    checked: "",
  });
  // const inputPro = inputs.products;
  const prodctLength = cartItem.length;

  const productKey = miliseconds + "/" + `${checked}` + "/" + prodctLength;

  const product = {
    select_product: checked,
    company: company,
    grade: grade,
    topcolor: color,
    coating: parseInt(coating),
    temper: temper,
    guardfilm: guard,
    weight: totalWeight,
  };

  const [loading, setLoading] = useState(false);

  // Get today's date in the format YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];
  const handleCheck = (e) => {
    setChecked(e.target.value);
  };
  const handleChange = (e) => {
    e.preventDefault();
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handlePhoneChange = (e) => {
    const { name, value } = e.target;

    // Allow only numeric values and limit the length to 10 digits
    if (/^\d*$/.test(value) && value.length <= 10) {
      setInputs({ ...inputs, [name]: value });
    }
  };
const handleRate = (e) => {
  e.preventDefault();
  const value = e.target.value;
  // Allow only numbers and decimal point
  if (/^\d*\.?\d*$/.test(value) || value === "") {
    setRate(value);
  }
};

  const sum = +rate * Number(18 / 1000);
  const final = +sum + +rate;
  useEffect(() => {
    setTotal(final);
    setGst(gst);
  }, [rate, final, gst]);

  const formData = {
    clientName: inputs.clientName,
    firmName: inputs.firmName,
    Email: inputs.Email,
    address: inputs.address,
    orderId: inputs.orderId,
    city: inputs.city,
    phone_no: parseInt(inputs.phone_no),
    deliveryDate: inputs.deliveryDate,
    products: cartItem,
  };


// Update the GST dropdown handler
const handleGstChange = (e) => {
  setSelectedGst(e.target.value);
  // Recalculate total when GST type changes
  if (rate && !isNaN(rate)) {
    const rateNum = parseFloat(rate);
    if (e.target.value === "basic") {
      const gstAmount = rateNum * 0.18;
      setTotal((rateNum + gstAmount).toFixed(2));
    } else {
      setTotal(rateNum.toFixed(2));
    }
  }
};

  console.log("Form Data : " + formData);
  const hadnleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("formData", formData);
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7Il9pZCI6IjYwM2IzNDM5MzViODI2MjBhMDg5ZTkwNyIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIn0sImlhdCI6MTYxNTg5MTU2MSwiZXhwIjoxNjE1OTc3OTYxfQ.exU8x5APvJBqlVKtIHHSYrqXMNKu38GyusySo-ZxCp4";
      console.log("enter in post fitchn data");
      await Axios.post(`${secret.Ip}/sales/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => {
        setLoading(false);
        console.log("response", response);
        console.log("enter in post fitchn data");

        if (response.status === 201) {
          console.log("Response : " + response);
          e.target.reset();
          window.scrollTo(0, 0);
          setSuccessAlert(true);
          window.location.href = "/listOrder";

          // setTimeout(() => {
          //   setSuccessAlert(false);
          //   window.location.href = "/listOrder";
          // }, 1500);
        } else {
          console.log("Created order", response);
          setFailureAlert(true);
          setTimeout(() => {
            setFailureAlert(false);
          }, 8000);
        }
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
      setFailureAlert(true);
      setTimeout(() => {
        setFailureAlert(false);
      }, 8000);
    }
  };

  // const onDeleteByIndex = (ind) => {
  //   const order = newProduct;
  //   order.splice(ind, 1);
  //   setNewProduct(order);
  // };

  const resetStates = () => {
    setCompany(Constants.Company[0].id);
    setGrade(Constants.Grade[0].id);
    setColor(Constants.Color[0].id);
    setCoating(Constants.Coating[0].id);
    setTemper(Constants.Temper[0].id);
    setGuard(Constants.Guard[0].id);
    setLength("");
    setPcs("");
    setRate("");
    setWidth("");
    setThickness("");
    setStockAvailable(false);
    setChecked("");
  };

  const [stockAvailable, setStockAvailable] = useState(false);

useEffect(() => {
  const checkStockAvailability = async () => {
    // Calculate total weight using the new formula for all orders
    let totalWeightForCheck = 0;
    orderList.forEach(order => {
      const lengthInMm = order.lengthInMm || 0;
      const orderWeight = calculateWeight(thickness, lengthInMm, width, order.pcs);
      totalWeightForCheck += orderWeight;
    });

    const product = {
      product: checked,
      company: company,
      grade: grade,
      topcolor: color,
      coating: parseInt(coating),
      temper: temper,
      guardfilm: guard,
      thickness: parseInt(thickness),
      width: parseInt(width),
      weight: parseFloat(totalWeightForCheck.toFixed(2)),
    };
    
    console.log("value of temper is", temper);
    try {
      console.log("my items =", product);
      const response = await Axios.post(
        "http://15.206.145.236:3009/sales",
        product,
        {
          headers: {
            Authorization: "Bearer THISISMYTOKENKEYNAME",
          },
        }
      );
      console.log("API response:", response.data);
      if (response.data) {
        setStockAvailable(true); // Product is available
      } else {
        setStockAvailable(false); // Product is not available
      }
    } catch (error) {
      console.error("Error checking stock availability:", error);
      setStockAvailable(false); // Error occurred, assume not available
    }
  };
  
  // Check if all required fields are filled and total weight is greater than 0
  if (
    company !== "" &&
    grade !== "" &&
    color !== "" &&
    coating !== "" &&
    temper !== "" &&
    guard !== "" &&
    thickness !== "" &&
    width !== "" &&
    checked !== "" && // Added check for product selection
    orderList.length > 0 && // Ensure there's at least one order
    orderList.some(order => order.pcs && (order.length || (order.feet && order.inch))) // Ensure at least one order has valid dimensions and pcs
  ) {
    // Calculate total weight to verify it's greater than 0
    let totalWeightForCheck = 0;
    orderList.forEach(order => {
      const lengthInMm = order.lengthInMm || 0;
      const orderWeight = calculateWeight(thickness, lengthInMm, width, order.pcs);
      totalWeightForCheck += orderWeight;
    });
    
    if (totalWeightForCheck > 0) {
      checkStockAvailability();
    } else {
      setStockAvailable(false);
    }
  } else {
    setStockAvailable(false);
  }
}, [
  thickness,
  width,
  orderList,
  company,
  grade,
  color,
  coating,
  temper,
  guard,
  checked,
  pcs // Added pcs to dependency array
]);

const handleAddToCart = async () => {
  // Calculate total weight for all orders
  let totalWeightForCart = 0;
  
  orderList.forEach(order => {
    const lengthInMm = order.lengthInMm || 0;
    const orderWeight = calculateWeight(thickness, lengthInMm, width, order.pcs);
    totalWeightForCart += orderWeight;
  });
  
  const rateBasic = totalWeightForCart;
  const gstPercentage = 18;
  const gstAmount = (gstPercentage / 100) * rateBasic;
  const rateGst = rateBasic + gstAmount;
  
  const product = {
    select_product: checked,
    company: company,
    grade: grade,
    topcolor: color,
    coating: parseInt(coating),
    temper: temper,
    guardfilm: guard,
    weight: totalWeightForCart,
    length: length,
    width: width,
    thickness: thickness,
    pcs: pcs,
    rate: rateBasic,
    gst: rateGst,
  };
  
  setCartItem([...cartItem, product]);
  setShowCartItem(true);
  setISCartEmpty(false);
  const scrollPosition = document.body.scrollHeight * 0.35;
  window.scrollTo(0, scrollPosition);
  resetStates();
};


  console.log("Cart Item : ", cartItem);
  console.log(handleAddToCart);

  useEffect(() => {
    const weight = length * pcs * 7.86;
    setTotalWeight(weight);
    setRate(weight);
  }, [thickness, width, length, pcs]);


  // Update the weight calculation to use the converted length
// Update the useEffect for weight calculation
useEffect(() => {
  let totalWeight = 0;
  
  orderList.forEach(order => {
    // Get length in mm (already converted)
    const lengthInMm = order.lengthInMm || 0;
    
    // Calculate weight for this order
    const orderWeight = calculateWeight(thickness, lengthInMm, width, order.pcs);
    totalWeight += orderWeight;
  });
  
  setTotalWeight(totalWeight);
  setRate(totalWeight);
}, [orderList, thickness, width]);


  useEffect(() => {
    setDesc((prevDesc) => ({
      ...prevDesc,
      weight: totalWeight,
    }));
  }, [totalWeight]);

  const deletingCardItems = (index) => {
    const updatedCartItems = cartItem.filter(
      (_, itemIndex) => itemIndex !== index
    );
    setCartItem(updatedCartItems);

    if (updatedCartItems.length === 0) {
      setISCartEmpty(true);
    }
  };

  const [todaysDate, setTodaysDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    setTodaysDate(formattedDate);
  }, []);


  // Add this useEffect to handle GST calculations
// Update the useEffect for GST calculations
useEffect(() => {
  if (rate && !isNaN(rate)) {
    const rateNum = parseFloat(rate);
    
    if (selectedGst === "basic") {
      // For Basic: add 18% GST to the rate
      const gstAmount = rateNum * 0.18;
      setTotal((rateNum + gstAmount).toFixed(2));
    } else {
      // For Paid: the rate already includes GST, so we calculate the base rate
      const baseRate = rateNum / 1.18;
      const gstAmount = rateNum - baseRate;
      // You can store these values if needed for display
      setTotal(rateNum.toFixed(2));
    }
  } else {
    setTotal("");
  }
}, [rate, selectedGst]);

  // const handleClose = () => {
  //   setShowEdit(false);
  // };

  // const handleEditShow = () => {
  //   setShowEdit(true);
  // };

  return (
    <>
      <Container className="col-xl-10 col-lg-8 col-md-12 col-sm-12">
        {/* ++++++++++++++++++++++++++ Left Div +++++++++++++++++++++++++*/}
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
              Congrats !! Orders Created SuccessFully
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
          <Col className="col-xl-8 col-lg-12 col-md-12 col-sm-12">
            <Container fluid className="col-xl-8 left_main_container d-block ">
              <Container className="inside_container">
                <form onSubmit={hadnleFormSubmit}>
                  <Row>
                    <h3>Create Order</h3>
                  </Row>
                  <Row className="inputRow">
                    <Col className="col-lg-4 label">Order-iD</Col>
                    <Col className="col-lg-1">-</Col>
                    <Col className="col-lg-7">{inputs.orderId}</Col>
                  </Row>
                  <Row className="inputRow">
                    <Col className="col-lg-4 label">Today's Date</Col>
                    <Col className="col-lg-1">-</Col>
                    <Col className="col-lg-7">{todaysDate}</Col>
                  </Row>
                  <Row className="inputRow">
                    <Col className="col-lg-4 label">Client Name</Col>
                    <Col className="col-lg-1">-</Col>
                    <Col className="col-lg-7">
                      <input
                        className="input_order"
                        onChange={(e) => {
                          const { value } = e.target;
                          handleChange(e); // Existing handler to update inputs
                          if (inputs.errors?.clientName) {
                            setInputs((prev) => ({
                              ...prev,
                              errors: { ...prev.errors, clientName: false },
                            }));
                          }
                        }}
                        value={inputs.clientName}
                        type="text"
                        name="clientName"
                        placeholder="Client Name"
                        required
                        onKeyPress={(e) => {
                          if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        onBlur={(e) => {
                          if (!e.target.value.trim()) {
                            setInputs((prev) => ({
                              ...prev,
                              errors: { ...prev.errors, clientName: true },
                            }));
                          }
                        }}
                      />
                      {inputs.errors?.clientName && (
                        <div style={{ color: 'red', marginTop: '5px' }}>
                          * Client Name is required
                        </div>
                      )}
                    </Col>
                  </Row>

                  <Row className="inputRow">
                    <Col className="col-lg-4 label">Firm Name</Col>
                    <Col className="col-lg-1">-</Col>
                    <Col className="col-lg-7">
                      <input
                        className="input_order"
                        onChange={(e) => {
                          const { value } = e.target;
                          handleChange(e); // Existing handler to update inputs
                          if (inputs.errors?.firmName) {
                            setInputs((prev) => ({
                              ...prev,
                              errors: { ...prev.errors, firmName: false },
                            }));
                          }
                        }}
                        value={inputs.firmName}
                        type="text"
                        name="firmName"
                        placeholder="Firm Name"
                        required
                        maxLength="20"
                        onKeyPress={(e) => {
                          if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        onBlur={(e) => {
                          const value = e.target.value.trim();
                          if (!value || !/^[a-zA-Z\s]+$/.test(value)) {
                            setInputs((prev) => ({
                              ...prev,
                              errors: { ...prev.errors, firmName: true },
                            }));
                          }
                        }}
                      />
                      {inputs.errors?.firmName && (
                        <div style={{ color: 'red', marginTop: '5px' }}>
                          * Firm Name is required
                        </div>
                      )}
                    </Col>
                  </Row>



                  <Row className="inputRow">
                    <Col className="col-lg-4 label">Email</Col>
                    <Col className="col-lg-1">-</Col>
                    <Col className="col-lg-7">
                      <input
                        className="input_order"
                        onChange={handleChange}
                        value={inputs.Email}
                        type="email"
                        name="Email"
                        placeholder="Enter Email Address"
                        required
                        maxLength="50"
                        onBlur={(e) => {
                          const value = e.target.value.trim();
                          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                          if (!value || !emailRegex.test(value)) {
                            setInputs((prev) => ({
                              ...prev,
                              errors: { ...prev.errors, Email: true },
                            }));
                          } else {
                            setInputs((prev) => ({
                              ...prev,
                              errors: { ...prev.errors, Email: false },
                            }));
                          }

                        }}
                      />
                      {inputs.errors?.Email && (
                        <div style={{ color: "red", marginTop: "5px" }}>
                          * Please enter a valid Email address
                        </div>
                      )}
                    </Col>
                  </Row>

                  <Row className="inputRow">
                    <Col className="col-lg-4 label">Address</Col>
                    <Col className="col-lg-1">-</Col>
                    <Col className="col-lg-7">
                      <input
                        className="input_order"
                        onChange={(e) => {
                          const { value } = e.target;
                          handleChange(e);
                          if (inputs.errors?.address) {
                            setInputs((prev) => ({
                              ...prev,
                              errors: { ...prev.errors, address: false },
                            }));
                          }
                        }}
                        value={inputs.address}
                        type="text"
                        name="address"
                        placeholder="Address"
                        required
                        maxLength="20"
                        onBlur={(e) => {
                          if (!e.target.value.trim()) {
                            setInputs((prev) => ({
                              ...prev,
                              errors: { ...prev.errors, address: true },
                            }));
                          }
                        }}
                      />
                      {inputs.errors?.address && (
                        <div style={{ color: 'red', marginTop: '5px' }}>
                          * Address is required
                        </div>
                      )}
                    </Col>
                  </Row>

                  <Row className="inputRow">
                    <Col className="col-lg-4 label">Phone</Col>
                    <Col className="col-lg-1">-</Col>
                    <Col className="col-lg-5">
                      <input
                        className="input_order"
                        onChange={(e) => {
                          const { value } = e.target;
                          handlePhoneChange(e);
                          if (inputs.errors?.phone_no && value.length === 10) {
                            setInputs((prev) => ({
                              ...prev,
                              errors: { ...prev.errors, phone_no: false },
                            }));
                          }
                        }}
                        value={inputs.phone_no}
                        type="text"
                        name="phone_no"
                        placeholder="Phone No."
                        required
                        maxLength="10"
                        onKeyPress={(e) => {
                          if (!/^[0-9]*$/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        onBlur={(e) => {
                          if (e.target.value.length !== 10) {
                            setInputs((prev) => ({
                              ...prev,
                              errors: { ...prev.errors, phone_no: true },
                            }));
                          }
                        }}
                      />
                      {inputs.errors?.phone_no && (
                        <div style={{ color: 'red', marginTop: '5px' }}>
                          * Phone number must be exactly 10 digits
                        </div>
                      )}
                    </Col>
                  </Row>

                  <Row className="inputRow">
                    <Col className="col-lg-4 label">City</Col>
                    <Col className="col-lg-1">-</Col>
                    <Col className="col-lg-5">
                      <select
                        className="modal_input inputSelect"
                        aria-label="Default select example"
                        onChange={handleChange}
                        value={inputs.city}
                        name="city"
                        required
                      >
                        <option className="defaultSelect">city</option>
                        <option>Ashok Nagar</option>
                        <option>Balaghat</option>
                        <option>Betul </option>
                        <option>Bhopal </option>
                        <option>Burhanpur</option>
                        <option>Chhatarpur</option>
                        <option> Dabra </option>
                        <option> Datia </option>
                        <option> Dewas </option>
                        <option> Dhar</option>
                        <option> Fatehabad </option>
                        <option> Gwalior</option>
                        <option> Indore </option>
                        <option> Itarsi</option>
                        <option> Jabalpur</option>
                        <option> Ktani</option>
                        <option> Kotma</option>
                        <option> Lahar</option>
                        <option> Lundi</option>
                        <option> Maharajpur </option>
                        <option> Mahidpur </option>
                        <option> Maihar </option>
                        <option> Malajkhand </option>
                        <option> Manasa </option>
                        <option> Manawar</option>
                        <option> Mandideep</option>
                        <option> Mandla </option>
                        <option> Mandsaur </option>
                        <option> Mauganj </option>
                        <option> Mhow Cantonment </option>
                        <option> Mhowgaon </option>
                        <option> Morena </option>
                        <option> Multai </option>
                        <option> Murwara</option>
                        <option> Nagda</option>
                        <option> Nainpur</option>
                        <option> Narsinghgarh </option>
                        <option> Neemuch </option>
                        <option> Nepanagar </option>undefined
                        <option> Niwari </option>
                        <option> Nowgong </option>
                        <option> Nowrozabad </option>
                        <option> Pachore </option>
                        <option> Pali</option>
                        <option> Panagar </option>
                        <option> Pandhurna </option>
                        <option> Panna</option>
                        <option> Pasan</option>
                        <option> Pipariya</option>
                        <option> Pithampur</option>
                        <option> Porsa</option>
                        <option> Prithvipur </option>
                        <option> Raghogarh-Vijaypur </option>
                        <option> Rahatgarh</option>
                        <option> Raisen </option>
                        <option> Rajgarh </option>
                        <option> Ratlam </option>
                        <option> Rau </option>
                        <option> Rehli</option>
                        <option> Rewa </option>
                        <option> Sabalgarh</option>
                        <option> Sagar </option>
                        <option> Sanawad</option>
                        <option> Sarangpur </option>
                        <option> Sarni </option>
                        <option> Satna </option>
                        <option> Sausar </option>
                        <option> Sehore </option>
                        <option> Sendhwa </option>
                        <option> Seoni </option>
                        <option> Seoni-Malwa </option>
                        <option> Shahdol </option>
                        <option> Shajapur</option>
                        <option> Shamgarh </option>
                        <option> Sheopur </option>
                        <option> Shivpuri </option>
                        <option> Shujalpur </option>
                        <option> Sidhi </option>
                        <option> Sihora </option>
                        <option> Singrauli </option>
                        <option> Sironj </option>
                        <option> Sohagpur</option>
                        <option> Tarana</option>
                        <option> Tikamgarh </option>
                        <option> Ujhani </option>
                        <option> Ujjain</option>
                        <option> Umaria</option>
                        <option> Vidisha</option>
                        <option> Wara Seoni </option>
                      </select>
                    </Col>
                  </Row>

                  <Row className="inputRow">
                    <Col className="col-lg-4 label">Delivery Date</Col>
                    <Col className="col-lg-1">-</Col>
                    <Col className="col-lg-6">
                      <input
                        className="input_order"
                        style={{ color: "grey" }}
                        onChange={handleChange}
                        value={inputs.deliveryDate || ""}
                        type="date"
                        name="deliveryDate"
                        placeholder="dd/mm/yyyy "
                        required
                        min={today}
                      />
                    </Col>
                  </Row>




                  <Row className="inputRow">
                    <Col className="col-lg-4 label">Products</Col>
                    <Col className="col-lg-1">-</Col>
                    <Row>
                      <Container fluid className="productContainer">
                        <Row className="ms-3">
                          <Col>
                            <Form.Check
                              className="radio"
                              type="radio"
                              aria-label="option 1"
                              label="GPC"
                              onChange={handleCheck}
                              name="checked"
                              value="GPC"
                              checked={checked === "GPC"}
                            />
                          </Col>
                          <Col>
                            <Form.Check
                              className="radio"
                              id="radio"
                              type="radio"
                              aria-label="option 1"
                              label="GPS"
                              onChange={handleCheck}
                              name="checked"
                              value="GPS"
                              checked={checked === "GPS"}
                            />
                          </Col>
                          <Col>
                            <Form.Check
                              className="radio"
                              id="radio"
                              type="radio"
                              aria-label="option 1"
                              label="Acce."
                              onChange={handleCheck}
                              name="checked"
                              value="Acce."
                              checked={checked === "Acce."}
                            />
                          </Col>
                        </Row>
                        <Row className="ms-3">
                          <Col>
                            <Form.Check
                              className="radio"
                              id="radio"
                              type="radio"
                              aria-label="option 1"
                              label="GC Coil"
                              onChange={handleCheck}
                              name="checked"
                              value="GC Coil"
                              checked={checked === "GC Coil"}
                            />
                          </Col>
                          <Col>
                            <Form.Check
                              className="radio"
                              id="radio"
                              type="radio"
                              aria-label="option 1"
                              label="HR"
                              onChange={handleCheck}
                              name="checked"
                              value="HR"
                              checked={checked === "HR"}
                            />
                          </Col>
                          <Col>
                            <Form.Check
                              className="radio"
                              id="radio"
                              type="radio"
                              aria-label="option 1"
                              label="CR"
                              onChange={handleCheck}
                              name="checked"
                              value="CR"
                              checked={checked === "CR"}
                            />
                          </Col>
                        </Row>
                        <Row className="ms-3">
                          <Col>
                            <Form.Check
                              className="radio"
                              id="radio"
                              type="radio"
                              aria-label="option 1"
                              label="Color Coil"
                              onChange={handleCheck}
                              name="checked"
                              value="Color Coil"
                              checked={checked === "Color Coil"}
                            />
                          </Col>
                          <Col>
                            <Form.Check
                              className="radio"
                              id="radio"
                              type="radio"
                              aria-label="option 1"
                              label="Profile Sheet"
                              onChange={handleCheck}
                              name="checked"
                              value="Profile Sheet"
                              checked={checked === "Profile Sheet"}
                            />
                          </Col>

                          <Col>
                            <Form.Check
                              className="radio"
                              id="radio"
                              type="radio"
                              aria-label="option 1"
                              label="GP Coil"
                              onChange={handleCheck}
                              name="checked"
                              value="GP Coil"
                              checked={checked === "GP Coil"}
                            />
                          </Col>
                          <Col>
                            <Form.Check
                              className="radio"
                              id="radio"
                              type="radio"
                              aria-label="option 1"
                              label="GP Sheet"
                              onChange={handleCheck}
                              name="checked"
                              value="GP Sheet"
                              checked={checked === "GP Sheet"}
                            />
                          </Col>
                          <Col>
                            <Form.Check
                              className="radio"
                              id="radio"
                              type="radio"
                              aria-label="option 1"
                              label="GC Sheet"
                              onChange={handleCheck}
                              name="checked"
                              value="GC Sheet"
                              checked={checked === "GC Sheet"}
                            />
                          </Col>

                          <Col>
                            <Form.Check
                              className="radio"
                              id="radio-hr-sheet"
                              type="radio"
                              aria-label="option 1"
                              label="Hr Sheet"
                              onChange={handleCheck}
                              name="checked"
                              value="Hr Sheet"
                              checked={checked === "Hr Sheet"}
                            />
                          </Col>

                          <Col>
                            <Form.Check
                              className="radio"
                              id="radio-hr-coil"
                              type="radio"
                              aria-label="option 1"
                              label="HR Coil"
                              onChange={handleCheck}
                              name="checked"
                              value="HR Coil"
                              checked={checked === "HR Coil"}
                            />
                          </Col>

                          <Col>
                            <Form.Check
                              className="radio"
                              id="radio-cr-sheet"
                              type="radio"
                              aria-label="option 1"
                              label="CR Sheet"
                              onChange={handleCheck}
                              name="checked"
                              value="CR Sheet"
                              checked={checked === "CR Sheet"}
                            />
                          </Col>

                          <Col>
                            <Form.Check
                              className="radio"
                              id="radio-cr-coil"
                              type="radio"
                              aria-label="option 1"
                              label="CR Coil"
                              onChange={handleCheck}
                              name="checked"
                              value="CR Coil"
                              checked={checked === "CR Coil"}
                            />
                          </Col>


                        </Row>
                      </Container>
                    </Row>
                  </Row>





                  <Row>
                    {/* ++++++++++++AFTER Order section ++++++++++++ */}
                    <Container>
                      <div className="afterOrder">
                        {successAlert && (
                          <div
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            <span style={{ color: "red", alignSelf: "center" }}>
                              <h5>Out Of Stock</h5>
                            </span>
                          </div>
                        )}
                        <Container className="insideAfterOrder">
                          <Row>
                            <h4>
                              <Badge
                                style={{ backgroundColor: "#2D3E4D" }}
                                bg="secondary"
                              >
                                {checked ? checked : "new"}
                              </Badge>
                            </h4>
                          </Row>
                          <Row>
                            <Col>
                              <p>Product No. - {productKey}</p>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <select
                                className="inputSelect"
                                aria-label="Default select example"
                                value={company}
                                onChange={(e) => {
                                  setCompany(e.target.value);
                                }}
                              // required
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
                                value={grade}
                                onChange={(e) => {
                                  setGrade(e.target.value);
                                }}
                              // required
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
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                              // required
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
                                onChange={(e) => setCoating(e.target.value)}
                                value={coating}
                              // required
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
                                onChange={(e) => setTemper(e.target.value)}
                                value={temper}
                              // required
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
                                onChange={(e) => setGuard(e.target.value)}
                                value={guard}
                              // required
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
                        <Container className="subInputs">
                          <Container className="insideInputs">
                            <Row>
                              <Col className="m-2">
                                <Row>
                                  <label htmlFor="thick">Thickness</label>
                                  <Container className="measure_conatiner">
                                    <input
                                      type="number"
                                      className="custom"
                                      id="thickness"
                                      min="0.1"
                                      placeholder="thickness"
                                      onChange={(e) => {
                                        setDesc({
                                          ...desc,
                                          thickness: e.target.value,
                                        });
                                        setThickness(e.target.value);
                                      }}
                                      value={thickness}
                                    ></input>
                                    <span className="py-2 px-1">mm</span>
                                  </Container>
                                </Row>
                              </Col>

                              <Col className="m-2">
<Row>
  <label htmlFor="width">Width</label>
  <Container className="measure_conatiner">
    <select
      className="custom"
      value={width}
      onChange={(e) => {
        setDesc({
          ...desc,
          width: e.target.value,
        });
        setWidth(e.target.value);
      }}
    >
      <option value="">Select width</option>
      <option value="1440">1440</option>
      <option value="1220">1220</option>
    </select>
    <span className="py-2 px-1">mm</span>
  </Container>
</Row>

                              </Col>
                            </Row>
<Row>
  {orderList.map((singleOrder, index) => {
    return (
      <div key={index} style={{ display: "flex" }}>
        <Col className="m-3">
          <Row>
            <label htmlFor="length" style={{ marginRight: '10px' }}>Length</label>
            <Container 
              className="measure_container"
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {/* Length type selection */}
              <select
                style={{ 
                  width: "100px",
                  padding: "6px",
                  borderRadius: "4px",
                  border: "1px solid #ccc"
                }}
                value={singleOrder.lengthType || "feet"}
                onChange={(e) => {
                  updateOrderLength(index, { lengthType: e.target.value });
                }}
              >
                <option value="feet">Feet</option>
                <option value="feetInch">Feet & Inch</option>
              </select>
              
              {/* Conditional Inputs */}
              {singleOrder.lengthType === "feetInch" ? (
                <>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      style={{ 
                        width: "80px", 
                        padding: "6px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        marginRight: "4px"
                      }}
                      type="number"
                      placeholder="Feet"
                      value={singleOrder.feet || ""}
                      onChange={(e) => {
                        updateOrderLength(index, { feet: e.target.value });
                      }}
                    />
                    <span style={{ marginRight: "12px" }}>ft</span>
                  </div>
                  
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      style={{ 
                        width: "80px", 
                        padding: "6px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        marginRight: "4px"
                      }}
                      type="number"
                      placeholder="Inch"
                      value={singleOrder.inch || ""}
                      onChange={(e) => {
                        updateOrderLength(index, { inch: e.target.value });
                      }}
                    />
                    <span>in</span>
                  </div>
                </>
              ) : (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    style={{ 
                      width: "150px",
                      padding: "6px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      marginRight: "4px"
                    }}
                    type="number"
                    placeholder="Length"
                    value={singleOrder.length || ""}
                    onChange={(e) => {
                      updateOrderLength(index, { length: e.target.value });
                    }}
                  />
                  <span>ft</span>
                </div>
              )}
              
              {/* Display converted length in mm */}
              <div style={{ marginLeft: "10px", color: "#666" }}>
                {singleOrder.lengthInMm > 0 && (
                  <span>{singleOrder.lengthInMm.toFixed(2)} mm</span>
                )}
              </div>
            </Container>
          </Row>
        </Col>
        
        {/* Pcs Column */}
        <Col className="m-3" style={{ display: "flex" }}>
          <Row>
            <label htmlFor="pcs" style={{ marginLeft: "10px" }}>Pcs.</label>
<input
  style={{ marginLeft: "10px", width: "150px" }}
  type="number"
  placeholder="Pcs"
  value={singleOrder.pcs || ""}
  onChange={(e) => {
    const updatedOrders = [...orderList];
    updatedOrders[index].pcs = e.target.value;
    setOrderList(updatedOrders);
  }}
  className="subfields"
/>
          </Row>
          <Row>
            <select
              className="pcsInput"
              aria-label="Default select example"
              value={singleOrder.unit || "piece"}
              onChange={(e) => {
                const updatedOrders = [...orderList];
                updatedOrders[index].unit = e.target.value;
                setOrderList(updatedOrders);
              }}
            >
              <option value="piece">piece</option>
              <option value="kg">kg</option>
            </select>
          </Row>
        </Col>
        
        {/* Remove Button */}
        <Col className="m-3">
          <Row className="mt-3 ml-6 ml-auto col-3"></Row>
          <Row>
            {orderList.length > 1 && (
              <button
                className="deleteButton"
                onClick={() => handleOrderRemove(index)}
              >
                <i className="fas fa-minus-circle"></i>
              </button>
            )}
          </Row>
        </Col>
      </div>
    );
  })}
</Row>

                            <Row>
                              <p id="weight">
                                TotalWeight:
                                <span id="result">{totalWeight === undefined ? totalWeight : totalWeight.toFixed(2)}</span>
                              </p>
                            </Row>
                          </Container>
                        </Container>
                        <Container className="justify-content-center">
<Row>
  <Col className="m-3">
    <Row>
      <label htmlFor="rate">
        {selectedGst === "basic" ? "Rate (Excl. GST)" : "Rate (Incl. GST)"}
      </label>
      <input
        name="rate"
        type="text"
        value={rate || ""}
        onChange={handleRate}
        placeholder={selectedGst === "basic" ? "Enter rate excl. GST" : "Enter rate incl. GST"}
        className="subfields"
      />
    </Row>
  </Col>
  <Col className="m-3">
    <Row>
      <label htmlFor="gst">
        {selectedGst === "basic" ? "Total (with GST)" : "Total (Incl. GST)"}
      </label>
      <input
        type="text"
        name="gst"
        value={total || ""}
        placeholder="Total amount"
        className="subfields"
        readOnly
      />
    </Row>
  </Col>
  <Col className="m-3">
    <Row>
      <select
        className="gstDropDown"
        aria-label="Default select example"
        value={selectedGst}
        onChange={handleGstChange}
      >
        <option value="basic">Basic</option>
        <option value="paid">Paid</option>
      </select>
    </Row>
  </Col>
</Row>

{selectedGst === "paid" && rate && !isNaN(rate) && (
  <Row className="mt-2">
    <Col className="m-3">
      <div style={{ fontSize: "0.85rem", color: "#666" }}>
        <p>Base Rate: ₹{(parseFloat(rate) / 1.18).toFixed(2)}</p>
        <p>GST Amount (18%): ₹{(parseFloat(rate) - (parseFloat(rate) / 1.18)).toFixed(2)}</p>
      </div>
    </Col>
  </Row>
)}

                        </Container>
                      </div>
                    </Container>
                  </Row>
                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex-end",
                      margin: "30px",
                    }}
                  >
                    {stockAvailable ? (
                      <p style={{ color: "green" }}>Stock Available</p>
                    ) : (
                      <p style={{ color: "red" }}>Stock Not Available</p>
                    )}

                    {/* {newProduct?.length > 0 && ( */}
                    <button
                      style={{
                        border: "none",
                        borderRadius: "5px",
                        backgroundColor: isCartEmpty ? "grey" : "orange",
                        color: "white",
                        padding: "10px",
                      }}
                      type="submit"
                      disabled={isCartEmpty || loading}
                    >
                      {loading ? (
                        <LoaderComp
                          type={"TailSpin"}
                          color={"white"}
                          hidden={true}
                          height={30}
                        />
                      ) : (
                        "Submit"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      style={{
                        border: "none",
                        borderRadius: "5px",
                        backgroundColor: !stockAvailable ? "grey" : "green",
                        color: "white",
                        padding: "10px",
                        marginLeft: "14px",
                      }}
                      disabled={!stockAvailable}
                    >
                      Add to cart
                    </button>

                    {/* )} */}
                  </div>
                </form>








              </Container>
            </Container>
          </Col>

          {/* ++++++++++++++++++++++++++ Right Div +++++++++++++++++++++++++*/}

          <Col className="col-xl-4 col-lg-12 col-md-12 col-sm-12 right_container">
            <h3>Orders</h3>
            <Container
              fluid
              className="OrderListContainer col-xl-4 col-lg-12 col-md-12 col-sm-12 "
            >
              <div className="InsideOrderListContainer">
                <Row>
                  <Col>
                    <h6>OrderId</h6>
                  </Col>
                  <Col>
                    <h6>{inputs.orderId}</h6>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>Company</h6>
                  </Col>
                  <Col>
                    <h6>{product.company}</h6>
                  </Col>
                </Row>
                <Row>
                  <Row>
                    <Col>
                      <p>Client Name -</p>
                    </Col>
                    <Col>
                      <p>{inputs.clientName}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p>Firm Name -</p>
                    </Col>
                    <Col>
                      <p>{inputs.firmName}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p>Email -</p>
                    </Col>
                    <Col>
                      <p>{inputs.Email}</p>
                    </Col>
                  </Row>
                  <Col>
                    <p>Address -</p>
                  </Col>
                  <Col>
                    <p>{inputs.address}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>Phone No. -</p>
                  </Col>
                  <Col>
                    <p>{inputs.phone_no}</p>
                  </Col>
                </Row>
                {/* <Row>
                  <Col>
                    <p>weight -</p>
                  </Col>
                  <Col>
                    <p>{totalWeight}</p>
                  </Col>
                </Row> */}
                <Row>
                  <Col>
                    <p>Delivery Date -</p>
                  </Col>
                  <Col>
                    <p>{inputs.deliveryDate}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>City-</p>
                  </Col>
                  <Col>
                    <p>{inputs.city}</p>
                  </Col>
                </Row>
              </div>
            </Container>

            {showCartItem &&
              cartItem.map((product, index) => {
                const data = [
                  { label: "Product", value: product.select_product },
                  { label: "Company", value: product.company },
                  { label: "Grade", value: product.grade },
                  { label: "Color", value: product.topcolor },
                  { label: "Coating", value: product.coating },
                  { label: "Temper", value: product.temper },
                  { label: "Guard", value: product.guardfilm },
                  { label: "Thickness", value: desc.thickness },
                  { label: "Width", value: desc.width },
                  { label: "Length", value: desc.length },
                  { label: "Weight", value: product.weight },
                  { label: "Pcs", value: `${desc.pcs} ${selectedUnit}` },
                  { label: "Rate(Basic)", value: product.weight },
                  {
                    label: "Rate(GST%)",
                    value: product.weight + product.weight * (18 / 1000),
                  },
                ];

                return (
                  <Container className="Cart-Div">
                    <div className="afterOrder2">
                      <Container className="insideAfterOrder">
                        <Row>
                          <div className="cart">
                            <div className="cart_buttons">
                              <button
                                onClick={() => deletingCardItems(index)}
                                style={{
                                  color: "red",
                                  backgroundColor: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  fontSize: "1.4rem",
                                }}
                              >
                                <i className="far fa-trash-alt"></i>
                              </button>

                              {/* <button
                                onClick={() => handleEditShow(index)}
                                style={{
                                  border: "none",
                                  backgroundColor: "transparent",
                                  color: "blue",
                                  cursor: "pointer",
                                  fontSize: "1.4rem",
                                }}
                              >
                                <i className="fas fa-pencil-alt"></i>
                              </button> */}
                            </div>
                          </div>
                        </Row>
                        {data.map((item, index) => (
                          <Row key={index}>
                            <Col className="Cart-Data">
                              <p>{item.label} : </p>
                              <p>{item.value} </p>
                            </Col>
                          </Row>
                        ))}
                      </Container>
                    </div>

                    {/* {showEdit && <EditCart onClose={handleClose} />} */}
                  </Container>
                );
              })}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateOrder;
