import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SelectTemplate from "./pages/SelectTemplate/SelectTemplate";
import Header from "./misc/Header/Header";
import Login from "./pages/Login/Login";
import CreateSite from "./pages/CreateSite/CreateSite";
import { connect } from "react-redux";
import { getUserAction } from "./store/actions/userActions";
import Profile from "./pages/Profile/Profile";

function App({ getUser }) {
  useEffect(() => {
    getUser();
  }, []);
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/select-template" component={SelectTemplate} />
        <Route path="/login" component={Login} />
        <Route path="/create-site/:id" component={CreateSite} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUserAction()),
});

export default connect(null, mapDispatchToProps)(App);
