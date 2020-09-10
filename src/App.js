import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SelectTemplate from "./pages/SelectTemplate/SelectTemplate";
import Header from "./misc/Header/Header";
import Login from "./pages/Login/Login";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/select-template" component={SelectTemplate} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
