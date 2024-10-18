import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import secret from "../config";
import "../Billing/BillMore.css";
const BillingMore = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [product, setProduct] = useState([]);
  const print = () => {
    window.print();
  };
  const fetchData = async () => {
    try {
      await Axios.get(`${secret.Ip}/BillingManagement/get/${id}`, {
        headers: {
          Authorization: `Bearer ${secret.token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => {
        console.log("response", response);
        const data = response.data.res;
        console.log("data", data);
        const Products = response.data.res.products.map((item) => ({
          ...item,
          length: item.length,
          width: item.width,
          thickness: item.thickness,
          pcs: item.pcs,
          rate: item.weight,
          gst: item.weight + (item.weight * 18) / 100,
        }));
        setItem(data);
        setProduct(Products);
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []); //[item, product]
  return (
    <>
      <div className="container invoice">
        <div className="invoice-header">
          <div className="row"></div>
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
                    <dt className="clientName">Client Name :</dt>
                    <dd>{item.clientName}</dd>
                    <dt className="clientName">First name</dt>
                    <dd>{item.firmName}</dd>
                    <dt className="clientName">Email</dt>
                    <dd>{item.Email}</dd>
                    <dt className="clientName">Address :</dt>
                    <dd>{item.address}</dd>
                    <dt>Phone :</dt>
                    <dd>{item.phone_no}</dd>
                    <dt>orderId :</dt>
                    <dd className="mono">{item.orderId}</dd>
                    <dt>City :</dt>
                    <dd className="mono">{item.city}</dd>
                    <dt>&nbsp;</dt>
                    <dd>&nbsp;</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="panel-heading">
            <h3 className="panel-title">Services / Products</h3>
          </div>
          {product.map((item, index) => (
            <div className="panel panel-default Service_section">
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
                        <b>grade</b>
                      </p>
                    </td>
                    <td className="text-center">{item.grade}</td>
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
                        <b>topcolor</b>
                      </p>
                    </td>

                    <td className="text-center">{item.topcolor}</td>
                  </tr>
                  <tr>
                    <td>
                      <p className="text-center">
                        <b>Coating</b>
                      </p>
                    </td>

                    <td className="text-center">{item.coating}</td>
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
                        <b>length</b>
                      </p>
                    </td>

                    <td className="text-center">{item.length}</td>
                  </tr>
                  <tr>
                    <td>
                      <p className="text-center">
                        <b>width</b>
                      </p>
                    </td>

                    <td className="text-center">{item.width}</td>
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
                        <b>pcs</b>
                      </p>
                    </td>

                    <td className="text-center">{item.pcs}Kg</td>
                  </tr>
                  <tr>
                    <td>
                      <p className="text-center">
                        <b>Rate(basic)</b>
                      </p>
                    </td>

                    <td className="text-center">{item.rate}</td>
                  </tr>
                  <tr>
                    <td>
                      <p className="text-center">
                        <b>Rate(GST%)</b>
                      </p>
                    </td>

                    <td className="text-center">{item.gst}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className="invoice-footer">
          Thank you for choosing our services. We hope to see you again soon
        </div>
        <button className="print_btn" onClick={print}>
          Print
        </button>
      </div>
    </>
  );
};
export default BillingMore;
