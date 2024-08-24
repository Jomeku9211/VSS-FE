import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import secret from "../config";
import "./BillMore.css";

const BillingMore = () => {
  const [isMounted, setIsMounted] = useState(true); 
  const [item,setItem]=useState({});
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  const print = () => {
    window.print();
  };

  const fetchData = async () => {
    try {
      const response = await Axios.get(`${secret.Ip}/BillingManagement/billing/${id}`, {
        headers: {
          Authorization: `Bearer ${secret.token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      
      if (isMounted) { 
        const data=response.data.message;
        console.log(data)
        setItem(data)
        const Products = response.data.message.products;
        console.log("Product",product)
        setProduct(Products);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();

   
    return () => {
      setIsMounted(false);
    };
  }, []);
  
  return (
    <div className="container invoice">
      <div className="invoice-header">
        <div className="row">
          <div className="col-xs-8">
            <h2>DELIVERY/ORDER CHALLAN</h2>
          </div>
        </div>
      </div>
      <div className="invoice-body">
        <div className="row">
          <div className="col-xs-7">
            <div className="Customer_Details_Box">
              <div className="Customer_Details_heading">
                <h3>Customer Details</h3>
              </div>
              <div className="Customer_Details_Inner_Box">
                <dl className="Customer_Details_Inner_Text">
                  <dt>Name :</dt>
                  <dd>{item.clientName}</dd>
                  <dt>FirmName</dt>
                  <dd>{item.firmName}</dd>
                  <dt>Email : </dt>
                  <dd>{item.Email}</dd>
                  <dt>Address :</dt>
                  <dd>{item.address}</dd>
                  <dt>Phone :</dt>
                  <dd>{item.phone_no}</dd>
                  <dt>Order Id</dt>
                  <dd className="mono">{item.orderId}</dd>
                  <dt>&nbsp;</dt>
                  <dd>&nbsp;</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="panel panel-default Service_section">
          <div className="panel-heading">
            <h3 className="panel-title">Services / Products</h3>
          </div>
          <table className="table table-bordered Table_section ">
            <thead>
              <tr>
                <th className="text-center">
                  <b>Item</b>
                </th>
                <th className="text-center colfix">
                  <b>Details</b>
                </th>
              </tr>
            </thead>
            {product.map((item,index) => (
              <tbody key={index}>
                <tr>
                  <td>
                    <p className="text-center">
                      <b>Company</b>
                    </p>
                  </td>
                  <td className="text-center">{item.company}</td>
                </tr>
                <tr>
                  <td>
                    <p className="text-center">
                      <b>coatingnum</b>
                    </p>
                  </td>
                  <td className="text-center">{item.coatingnum}</td>
                </tr>
                <tr>
                  <td>
                    <p className="text-center">
                      <b>grade</b>
                    </p>
                  </td>
                  <td className="text-center">{item.grade}</td>
                </tr>
                <tr>
                  <td>
                    <p className="text-center">
                      <b>gst</b>
                    </p>
                  </td>
                  <td className="text-center">{item.gst}</td>
                </tr>
                <tr>
                  <td>
                    <p className="text-center">
                      <b>guardfilm</b>
                    </p>
                  </td>

                  <td className="text-center">{item.guardfilm}</td>
                </tr>
                <tr>
                  <td>
                    <p className="text-center">
                      <b>isOrderReady</b>
                    </p>
                  </td>

                  <td className="text-center">{item.isOrderReady}</td>
                </tr>
                <tr>
                  <td>
                    <p className="text-center">
                      <b>length</b>
                    </p>
                  </td>
                  <td className="text-center">{item.length}</td>
                </tr>
                <tr>
                  <td>
                    <p className="text-center">
                      <b>pcs</b>
                    </p>
                  </td>

                  <td className="text-center">{item.pcs}</td>
                </tr>
                <tr>
                  <td>
                    <p className="text-center">
                      <b>productId</b>
                    </p>
                  </td>

                  <td className="text-center">{item.productId}</td>
                </tr>
                <tr>
                  <td>
                    <p className="text-center">
                      <b>rate</b>
                    </p>
                  </td>

                  <td className="text-center">{item.rate}</td>
                </tr>
                <tr>
                  <td>
                    <p className="text-center">
                      <b>select_product</b>
                    </p>
                  </td>

                  <td className="text-center">{item.select_product}</td>
                </tr>
                <tr>
                  <td>
                    <p className="text-center">
                      <b>temper</b>
                    </p>
                  </td>

                  <td className="text-center">{item.temper}</td>
                </tr>
                <tr>
                  <td>
                    <p className="text-center">
                      <b>thickness</b>
                    </p>
                  </td>

                  <td className="text-center">{item.thickness}</td>
                </tr>
                <tr>
                  <td>
                    <p className="text-center">
                      <b>topcolor</b>
                    </p>
                  </td>

                  <td className="text-center">{item.topcolor}</td>
                </tr>
                <tr>
                  <td>
                    <p className="text-center">
                      <b>weight</b>
                    </p>
                  </td>

                  <td className="text-center">{item.weight}</td>
                </tr>
                <tr>
                  <td>
                    <p className="text-center">
                      <b>width</b>
                    </p>
                  </td>

                  <td className="text-center">{item.width}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
      <div className="invoice-footer">
        Thank you for choosing our services. We hope to see you again soon
      </div>
      <button
        className="ms-auto"
        style={{
          backgroundColor: "transparent",
          border: "none",
          boxShadow: "0px 2px 6px lightgrey",
          width: "100px",
          padding: "10px",
          marginBottom: "1%",
        }}
        onClick={print}
      >
        Print
      </button>
    </div>
  );
};

export default BillingMore;