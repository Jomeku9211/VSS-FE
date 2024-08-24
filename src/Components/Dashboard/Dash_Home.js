import React from "react";
import "../Dashboard/dashboard.css";
import { withRouter } from "react-router-dom";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Sidenav from "./Sidenav";
import Home from "../Dashboard/Home";
import Create from "../CreateOrder/CreateOrder";
import AddUser from "../AddUser/AddUser";
import Stocks from "../Stocks/Stocks";
import Purchase from "../Purchase/Purchase";
import PurchaseOrder from "../Purchase/Purchase_Order";
import ListOrder from "../ListOrder/ListOrder";
import ViewMoreList from "../ListOrder/ViewMoreList";
import PurchaseView from "../Purchase/PurchaseView";
import BillingList from "../Billing/BillingList";
import BillingMore from "../Billing/BillingMore";

const Dash_Home = ({ match, location, history }) => {
  return (
    <>
      <Router>
        <div className="main_container">
          <Sidenav/>
          <Link to={`/create_order`}></Link>
          <Link to={`/listOrder`}></Link>
          <Link to={`/addUser`}></Link>
          <Link to={`/stocks`}></Link>
          <Link to={`/purchase`}></Link>
          <Link to={`/purchase/:id`}></Link>
          <Link to={`/purchase_order`}></Link>
          <Link to={`/listOrder/:id`}></Link>
          <Link to={`/billing/:id`}></Link>
          <Link to={`/billing`}></Link>
          <Switch>
            <Route exact path={`/`}>
              <Home/>
            </Route>
            <Route exact path={`/create_order`}>
              <div className="create_section">
                <Create  />
              </div>
            </Route>
            <Route exact path={"/listOrder"}>
              <div className="listOrder">
                <ListOrder/>
              </div>
            </Route>
            <Route exact path={"/listOrder/:id"}>
              <div className="listOrder">
                <ViewMoreList/>
              </div>
            </Route>
            <Route exact path={"/addUser"}>
              <div className="addUser">
                <AddUser match={match.path}/>
              </div>
            </Route>
            <Route exact path={"/stocks"}>
              <div className="stocks">
                <Stocks/>
              </div>
            </Route>
            <Route exact path={"/purchase"}>
              <div className="purchase">
                <Purchase/>
              </div>
            </Route>
            <Route exact path={"/purchase_order"}>
              <div className="purchase">
                <PurchaseOrder/>
              </div>
            </Route>
          
            <Route exact path={"/purchase/:id"}>
              <div className="purchase">
                <PurchaseView/>
              </div>
            </Route>
            <Route exact path={"/billing"}>
              <div className="purchase">
                <BillingList/>
              </div>
            </Route>
            <Route exact path={"/billing/:id"}>
              <div className="billing">
                <BillingMore/>
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default withRouter(Dash_Home);