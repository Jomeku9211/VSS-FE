import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Center.css";
import Cards from "./Cards";
import ApexChart from "./BarGraph.js/ApexChart";
import { Link } from "react-router-dom";
import Axios from "axios";
import axios from "axios";
import secret from "../../config.js";

const Center = ({ match }) => {
  const [weight, setWeight] = useState();

  const [item, setItem] = useState({});
  const [sales, setSales] = useState([]);
  const [users, setUsers] = useState([]);
  const tonn = 1000;

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
        setWeight(response.data.totalweight);
        console.log("ToTal  tonn", response.data.totalweight);
      } catch (error) {
        console.error("Error fetching total weight:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7Il9pZCI6IjYwM2IzNDM5MzViODI2MjBhMDg5ZTkwNyIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIn0sImlhdCI6MTYxNTg5MTU2MSwiZXhwIjoxNjE1OTc3OTYxfQ.exU8x5APvJBqlVKtIHHSYrqXMNKu38GyusySo-ZxCp4";
        await Axios.get("http://3.110.171.168:3001/api/v1/total/getadmin", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }).then((response) => {
          const totalUsers = response.data.totalusers[0];
          setItem(response.data);
          setSales(response.data.totalsales);
          setUsers(totalUsers);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7Il9pZCI6IjYwM2IzNDM5MzViODI2MjBhMDg5ZTkwNyIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIn0sImlhdCI6MTYxNTg5MTU2MSwiZXhwIjoxNjE1OTc3OTYxfQ.exU8x5APvJBqlVKtIHHSYrqXMNKu38GyusySo-ZxCp4";
      await Axios.get(
        "http://3.110.171.168:3001/api/v1/BillingManagement/RecentWeeklyOrder",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      ).then((response) => {
        setTimeout(() => {
          if (response.status === 201) {
            const recentOrder = response.data.output;
            console.log(recentOrder);
          } else {
          }
        }, 1000);
      });
    };
    fetchData();
  }, []);
  let totalsales;
  totalsales = sales.map((val, ind) => {
    return <div key={ind}>{val.count}</div>;
  });

  return (
    <>
      <Container className="center_outest_Container">
        <Container className="container1">
          <Row>
            <div className="col-lg-8 ">
              <Row>
                <Cards name="Total Sales" value={totalsales} />
                <Cards name="Total Clients" value={item.totalClients} />
                <Cards name="Total Users" value={users.count} />
              </Row>
            </div>

            <Col className="col-lg-4">
              <Link to={`/create_order`}>
                <button className="create-Button">+ Create Order</button>
              </Link>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Container fluid className="second_container">
              <Row>
                <div className="Second_left col-lg-12 col-sm-12 col-md-12">
                  <Row>
                    <p>This week sales: {tonn - weight} tonn</p>
                  </Row>
                </div>
                <div
                  className="Second_right col-lg-12 col-xl-12 col-md-12 col-sm-12 container-fluid"
                  style={{ paddingTop: "30px" }}
                >
                  <ApexChart />
                </div>
              </Row>
            </Container>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Center;
