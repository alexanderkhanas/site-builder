import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./misc/Header/Header";
import { connect } from "react-redux";
import { getUserAction } from "./store/actions/userActions";
import { getHomeContentAction } from "./store/actions/contentActions";
import PublicOffer from "./pages/PublicOffer/PublicOffer";
import Modal from "./misc/Modal/Modal";
import FullPageLoader from "./misc/FullPageLoader/FullPageLoader";
import { Redirect } from "react-router";

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
const Gallery = lazy(() => import("./pages/Gallery/Gallery"));

const PrivateRoute = ({
  redirectTo,
  component: Component,
  condition,
  state = {},
  ...rest
}) => (
  <Route {...rest}>
    {condition ? (
      <Component />
    ) : (
      <Redirect to={{ pathname: redirectTo, state }} />
    )}
  </Route>
);

function App({ getUser, getContent, user }) {
  const { isLogging, id } = user;
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    getContent();
  }, []);
  return !isLogging ? (
    <Router>
      <Header />
      <Modal />
      <div className="container">
        <Suspense fallback={<div className="fallback" />}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute
              condition={!!id}
              redirectTo="/login"
              path="/create-site/:id"
              component={CreateSite}
            />
            <PrivateRoute
              condition={!!id}
              redirectTo="/login"
              path="/select-template"
              component={SelectTemplate}
            />
            <PrivateRoute
              condition={!!id}
              redirectTo="/login"
              path="/sites"
              component={Sites}
            />
            <PrivateRoute
              condition={!!id}
              redirectTo="/login"
              path="/site/demo/:id"
              component={Demo}
            />
            <PrivateRoute
              condition={!!id}
              redirectTo="/login"
              path="/edit-site/:id"
              component={EditSite}
            />
            <PrivateRoute
              condition={!!id}
              redirectTo="/login"
              path="/site/:id"
              component={SingleSite}
            />
            <PrivateRoute
              condition={!!id}
              redirectTo="/login"
              path="/profile"
              component={Profile}
            />
            <Route path="/gallery" component={Gallery} />
            <Route path="/about-us" component={About} />
            <Route path="/public-offer" component={PublicOffer} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  ) : (
    <FullPageLoader />
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUserAction()),
  getContent: () => dispatch(getHomeContentAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
