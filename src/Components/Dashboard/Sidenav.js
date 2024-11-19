import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./dashboard.css";
const Sidenav = () => {
  // const { path } = useRouteMatch();
  // console.log(path);
  // console.log(match)
  const history = useHistory();
  const handleLogout = () => {
    
    /* eslint-disable */
    const toLogout = confirm("Are you sure to logout ?");

    if (toLogout) {
      localStorage.clear();
      history.push("/login");
      window.location.reload(true);
    }
  };
  return (
    <>
      <div className="sidenav">
        <img
          className="profile_img"
          src={
            "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
          }
          alt="profile"
        />
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "block",
            marginLeft: "10px",
          }}
        >
          {/* <div>
            <Link className="nav_link d-block" to={"/"}>
              <i className="fas fa-home"></i>
            </Link>
            <p className="nav_text">Home</p> */}
          {/* </div> */}
          <div>
            <Link className="nav_link" to="/listOrder">
              <i className="fab fa-opencart"></i>
            </Link>
            <p className="nav_text">Orders</p>
          </div>
          <div>
            <Link className="nav_link" to="/addUser">
              <i className="fas fa-user-plus"></i>
            </Link>
            <p className="nav_text">Users</p>
          </div>
          <div>
            <Link className="nav_link" to="/stocks">
              <i className="fas fa-cubes"></i>
            </Link>
            <p className="nav_text">Stocks</p>
          </div>
   
          {/* <div>
            <Link className="nav_link" to="/billing">
              <i className="fas fa-file-invoice"></i>
            </Link>
            <p className="nav_text">Billing</p>
          </div> */}
          <div>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "white",
                }}
              >
                <i className="fas fa-sign-out-alt"></i>
              </button>
            <p className="nav_text">Logout</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidenav;