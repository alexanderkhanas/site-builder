import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./misc/Header/Header";
import { connect } from "react-redux";
import { getUserAction } from "./store/actions/userActions";
import { getHomeContentAction } from "./store/actions/contentActions";
import Register from "./pages/Register/Register";
import Sites from "./pages/Sites/Sites";

const Login = lazy(() => import("./pages/Login/Login"));
const CreateSite = lazy(() => import("./pages/CreateSite/CreateSite"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const SelectTemplate = lazy(() =>
  import("./pages/SelectTemplate/SelectTemplate")
);

function App({ getUser, getContent }) {
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    getContent();
  }, []);
  return (
    <Router>
      <Header />
      <Suspense fallback={<div className="fallback" />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/select-template" component={SelectTemplate} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/create-site/:id" component={CreateSite} />
          <Route path="/profile" component={Profile} />
          <Route path="/sites" component={Sites} />
        </Switch>
      </Suspense>
    </Router>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUserAction()),
  getContent: () => dispatch(getHomeContentAction()),
});

export default connect(null, mapDispatchToProps)(App);
