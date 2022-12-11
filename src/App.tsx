import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Web3ContextProvider } from "./context/Web3Context";
import Home from "./views/home";
import "./App.css";

function App() {
  return (
    <Suspense>
      <Web3ContextProvider>
        <Router>
          <Switch>
            <Route path="/home" component={Home} />
            <Redirect to="/home" />
          </Switch>
        </Router>
      </Web3ContextProvider>
    </Suspense>
  );
}

export default App;
