import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./misc/Header/Header";
import { connect } from "react-redux";
import { getUserAction } from "./store/actions/userActions";
import { getHomeContentAction } from "./store/actions/contentActions";
import PublicOffer from "./pages/PublicOffer/PublicOffer";
import Modal from "./misc/Modal/Modal";

const Login = lazy(() => import("./pages/Login/Login"));
const CreateSite = lazy(() => import("./pages/CreateSite/CreateSite"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const SelectTemplate = lazy(() =>
  import("./pages/SelectTemplate/SelectTemplate")
);
const Register = lazy(() => import("./pages/Register/Register"));
const Sites = lazy(() => import("./pages/Sites/Sites"));
const EditSite = lazy(() => import("./pages/EditSite/EditSite"));
const Demo = lazy(() => import("./pages/Demo/Demo"));
const SingleSite = lazy(() => import("./pages/SingleSite/SingleSite"));
const About = lazy(() => import("./pages/About/About"));

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
      <Modal />
      <div className="container">
        <Suspense fallback={<div className="fallback" />}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/select-template" component={SelectTemplate} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/create-site/:id" component={CreateSite} />
            <Route path="/profile" component={Profile} />
            <Route path="/sites" component={Sites} />
            <Route path="/site/demo/:id" component={Demo} />
            <Route path="/edit-site/:id" component={EditSite} />
            <Route path="/site/:id" component={SingleSite} />
            <Route path="/about-us" component={About} />
            <Route path="/public-offer" component={PublicOffer} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUserAction()),
  getContent: () => dispatch(getHomeContentAction()),
});

export default connect(null, mapDispatchToProps)(App);
