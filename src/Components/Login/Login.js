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
      const userData = {
        username: info.username,
        password: info.password,
      };
  
      console.log("API Request Initiated:", userData);
  
      const response = await axios.post(`${secret.Ip}/admin/login`, userData);
  
      console.log("API Response Received:", response);
      console.log(response.data.data.token)
      if (response.data.data.token) {
        console.log("Inside the If")
        console.log(response.data.data.token)
        localStorage.setItem("token", response.data.data.token);
        console.log("Authentication Successful:", response.data.data);
        history.push("/");
      } else {
        const errorMessage = response.data.message || "No error message provided";
        console.log("Authentication Failed:", errorMessage);
        setError(true);
        setTimeout(() => setError(false), 3000);
      }
      
    } catch (error) {
      console.error("API Request Error:", error);
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