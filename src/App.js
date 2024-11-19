import React from "react";
import "./App.css";
import Login from "./Components/Login/Login";
import {
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dash_Home";
import CreateOrder from "./Components/CreateOrder/CreateOrder";
import ListOrder from "./Components/ListOrder/ListOrder";
import AddUser from "./Components/AddUser/AddUser";
import PurchaseOrder from "./Components/Purchase/Purchase_Order";
import Stocks from "./Components/Stocks/Stocks";
import Sidenav from "./Components/Dashboard/Sidenav";
import BillingList from "./Components/Billing/BillingList";
import ViewMoreList from "./Components/ListOrder/ViewMoreList";
import BillingMore from "./Components/Billing/BillingMore";


function App() {

  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  return (
      <div>
        
          <Sidenav />
          <Switch>
        <Route path="/login" component={Login} />
        <Route exact path={"/listOrder/:id"}>
              <div className="listOrder">
                <ViewMoreList/>
              </div>
            </Route>

            <Route exact path={"/billing/:id"}>
              <div className="billing">
                <BillingMore/>
              </div>
            </Route>

        <PrivateRoute path="/" exact component={ListOrder} />
        <PrivateRoute path="/create_order" exact component={CreateOrder} />
        <PrivateRoute path="/purchase_order" component={PurchaseOrder} />
        <PrivateRoute path="/listOrder" component={ListOrder}/>
        <PrivateRoute path="/addUser" component={AddUser} />
        <PrivateRoute path="/stocks" component={Stocks} />
        <PrivateRoute path="/billing" component={BillingList} />
        </Switch>
      </div>
  );
}

export default App;