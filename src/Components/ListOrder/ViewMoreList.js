import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import secret from "../config";
import "../Billing/BillMore.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


const BillingMore = () => {

  const { id } = useParams();
  const [item, setItem] = useState({});
  const [product, setProduct] = useState([]);
const [ show, setShow ] = useState(false);

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
          gst: item.weight + (item.weight * 18) / 1000,
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
  }, []);

  const handleDownloadPdf = async () => {
    const pdfBody = document.querySelector(".Pdf_Body");
    const canvas = await html2canvas(pdfBody, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("orderInvoice.pdf");

    setTimeout(() => {
      setShow(false);
    }, 1000);
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
              <table className="table table-bordered Table_section">
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

         <div className="btns">
         <button className="print_btn" onClick={() => setShow(true)}>
          Dowanload Pdf
        </button>
        <button className="print_btn" onClick={print}>
          print
        </button>
         </div>
      </div>


       {
         show && (
          <div className={`overlay ${show ? "" : "hidden"}`}>
          <div className="Pdf_Body">
          <div className="row">
            <div className="col-xs-7">
             <div>
             </div>
            <div className="pdf_header">
                <div className="pdf_no">
                 <h3>Order ID : </h3>
                 <h4>{item.orderId}</h4>
                 </div>
                 <div className="pdf_no">
                 <h3>Ordered Date : </h3>
                 <h4>{todaysDate}</h4>
                 </div>
              </div>
              <div className="Customer_Details_Box_pdf">
            
                <div className="Customer_Details_Inner_Box">
                  <dl className="Customer_Details_Inner_Text">
                    <dt className="clientName">Mr/Mrs : </dt>
                    <dd>{item.clientName}</dd>
                  </dl>
                  <dl className="Customer_Details_Inner_Text">
                    <dt className="clientName">Email : </dt>
                    <dd>{item.Email}</dd>
                  </dl>
                  <dl className="Customer_Details_Inner_Text">
                    <dt className="clientName">Address : </dt>
                    <dd>{item.address}</dd>
                  </dl>
                  <dl className="Customer_Details_Inner_Text">
                    <dt className="clientName">Phone no : </dt>
                    <dd>{item.phone_no}</dd>
                  </dl>
                  <dl className="Customer_Details_Inner_Text">
                    <dt className="clientName">City : </dt>
                    <dd>{item.city}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
            <div className="pdf_table_div">
              <table className="pdf_DataTable">
                <thead>
                  <tr>
                    <th><b>Item</b> </th>
                    <th> <b>Thickness</b></th>
                    <th><b>Width</b></th>
                    <th><b>Length</b></th>
                    <th><b>Weight</b> </th>
                    <th> <b>Pcs</b></th>
                    <th><b>Rate</b></th>                   
                     <th><b>Product</b></th>
                  </tr>
                </thead>
                
          {product.map((item, index) => (
                    <tbody key={index}>
                  <tr className="datatable_trs">
                    <td className="text-center">{item.company}</td>
                    <td className="text-center">{item.thickness}</td>
                    <td className="text-center">{item.width}</td>
                    <td className="text-center">{item.length}</td>
                    <td className="text-center">{item.weight}</td>
                    <td className="text-center">{item.pcs} Kg</td>
                    <td className="text-center">{item.rate}</td>
                    <td className="text-center">{item.select_product}</td>
                  </tr>
 
                </tbody>
                ))}
              </table>
            </div>
 
            <div className="pdf_footer">
              <div className="hindi_texts">
              "हमारे यहाँ से माल रुकवा एवं प्रीति प्रेषण किया गया है। ट्रक में पर्ची लगाने के
               उपरांत माल की खपत होने की जिम्मेदारी हमारी नहीं होगी।"
              </div>
           <div className="pdf_footer_right">
             {/* <div className="footer_right">
                <b>Received By : </b>
                <b>undefined</b>
              </div> */}
              <div className="footer_right">
                 <b>Delivery Date : </b>
                 <p>{item.deliveryDate}</p>
              </div>
           </div>
            </div>
            
            <div className="pdf_btn">
               <button className="pdf_download_btn" onClick={handleDownloadPdf}>
                 Download
               </button>
               <button className="pdf_download_btn" onClick={() => setShow(false)}>
                 Close
               </button>
            </div>
            </div>         
        </div>
         )
       }
     
    </>
  );
};
export default BillingMore;
