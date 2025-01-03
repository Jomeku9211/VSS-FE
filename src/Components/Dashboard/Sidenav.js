import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import "./dashboard.css";
const Sidenav = () => {
  const [role, setRole] = useState(null);
  const [reloadSidenav, setReloadSidenav] = useState(false);
  // const { path } = useRouteMatch();
  // console.log(path);
  // console.log(match)
  const history = useHistory();
  const handleLogout = () => {
    
    /* eslint-disable */
    const toLogout = confirm("Are you sure to logout ?");

    if (toLogout) {
      // Remove only the admin token and related data
     localStorage.removeItem("token")
       localStorage.removeItem("role")
      
      // Redirect to login and reload
      history.push("/login");
      window.location.reload(true);
    }
  };
  
  // useEffect(() => {
  //  
  // }, []); // Only run once on component mount

  // useEffect(() => {
  //   if (role === "Admin") {
  //     // Ensure Users section is displayed immediately after login
  //     window.location.reload(false); // Reload only once for Admin
  //   }
  // }, [role]);

  useEffect(() => {
    const fetchedRole = localStorage.getItem("role");
    setRole(fetchedRole);
  }, [reloadSidenav]);


  useEffect(() => {
    const unsubscribe = history.listen((location) => {
      if (location.pathname === "/") {
        setReloadSidenav((prev) => !prev);  // Trigger re-render of sidenav
      }
    });

    return () => unsubscribe();
  }, [history]);


  return (
    <>
      <div className="sidenav">
        <img
          className="profile_img"
          src={"https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"}
          alt="profile"
        />
        <div style={{ justifyContent: "center", alignItems: "center", display: "block", marginLeft: "10px" }}>
          {/* Other navigation links */}
          {role==="Admin" && (
            <div>
            <Link className="nav_link" to="/listOrder">
              <i className="fab fa-opencart"></i>
            </Link>
            <p className="nav_text">Orders</p>
          </div>
          )}
          
          <div>
            <Link className="nav_link" to="/stocks">
              <i className="fas fa-cubes"></i>
            </Link>
            <p className="nav_text">Stocks</p>
          </div>

          {/* Conditional rendering for Users section */}

          {role === "Admin" && (
          <div>
            <Link className="nav_link" to="/addUser">
              <i className="fas fa-user-plus"></i>
            </Link>
            <p className="nav_text">Users</p>
          </div>
        )}
       
          <div>
            <button onClick={handleLogout} style={{ backgroundColor: "transparent", border: "none", color: "white" }}>
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