import React, { useState, useEffect } from "react";
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
      let userData;
      let response;
  
      if (info.username === "vickyindore" && info.password === "1234@1234") {
        // Admin Login
        userData = {
          username: info.username,
          password: info.password,
        };
        response = await axios.post(`${secret.Ip}/admin/login`, userData);
        if (response.data.data?.token) {
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("role", "Admin");
          history.push("/");
        } else {
          setError(true);
          setTimeout(() => setError(false), 3000);
        }
      } else {
        // Stock Manager Login
        userData = {
          UserName: info.username,
          Password: info.password,
          Role: "StockManager",
        };
        response = await axios.post(`${secret.Ip}/mobile/MobileLogin`, userData);
        if (response.data.data?.token) {
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("role", "StockManager");
         
          history.push("/stocks");
          window.location.reload();
        } else {
          setError(true);
          setTimeout(() => setError(false), 3000);
        }
      }
  
      console.log("User Data:", userData);
      console.log("Login Response:", response.data);
    } catch (error) {
      console.error("Login Error:", error);
      setError(true);
      setTimeout(() => setError(false), 3000);
    } finally {
      setLoading(false);
    }
  };
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (token) {
        if (role === "Admin") {
          history.push("/"); 
        } else if (role === "StockManager") {
          history.push("/stocks");
        }
      }
    }, [history]);



  
  
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