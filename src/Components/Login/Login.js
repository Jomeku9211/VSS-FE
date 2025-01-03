import React, { useState } from "react";
import { Container, Alert } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Route, useHistory } from "react-router-dom";
import axios from "axios";
import LoaderComp from "../Loader/LoaderComp";
import secret from '../config';
import "./Login.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "20ch",
      margin: "50px",
    },
  },
}));

const Login = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({ username: "", password: "" });
  const history = useHistory();

  const handleChange = (e) => {
    e.preventDefault();
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Retrieve all stock manager credentials from localStorage
      const stockManagerCredentials = JSON.parse(localStorage.getItem("stockManagerCredentials")) || [];
  
      console.log("stockManagerCredentials", stockManagerCredentials);
  
      // Check if the entered username and password match any stock manager
      const matchedManager = stockManagerCredentials.find(
        (manager) =>
          manager.username === info.username && manager.password === info.password
      );
  
      if (matchedManager) {
        // Stock Manager Login
        const userData = {
          UserName: info.username,
          Password: info.password,
          Role: "StockManager",
        };
  
        console.log("userData", userData);
        const response = await axios.post(`${secret.Ip}/Mobile/MobileLogin`, userData);
        console.log("Stock Manager Login Response:", response.data);
  
        if (response.data.data?.token) {
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("role", "StockManager");
          history.push("/stocks");
        } else {
          setError(true);
          setTimeout(() => setError(false), 3000);
        }
      } else {
        // Admin Login (if no matching stock manager credentials are found)
        const userData = {
          username: info.username,
          password: info.password,
        };
  
        const response = await axios.post(`${secret.Ip}/admin/login`, userData);
        console.log("Admin Login Response:", response.data);
  
        if (response.data.data?.token) {
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("role", "Admin"); 
          history.push("/");
        } else {
          setError(true);
          setTimeout(() => setError(false), 3000);
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError(true);
      setTimeout(() => setError(false), 3000);
    } finally {
      setLoading(false);
    }
  };
  
  
  const classes = useStyles();

  return (
    <Route>
      <Container className="Login_Container">
        <Alert
          show={error}
          variant="danger"
          onClose={() => setError(false)}
          style={{ width: "100%", height: "auto" }}
        >
          Oops! UserName Or Password Did not Match
        </Alert>
        <Container className="Login_back_image">
          <Container className="form_container">
            <form
              onSubmit={handleSubmit}
              className={classes.root}
              autoComplete="off"
            >
              <div>
                <TextField
                  label="Username"
                  variant="outlined"
                  value={info.username}
                  onChange={handleChange}
                  name="username"
                  required
                />
              </div>

              <div>
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="password"
                  value={info.password}
                  onChange={handleChange}
                  required
                  className="text_field"
                />
              </div>

              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <button className="btn btn-submit btn-div" type="submit">
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
              </div>
            </form>
          </Container>
        </Container>
      </Container>
    </Route>
  );
};

export default Login;