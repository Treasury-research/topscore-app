import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Web3ContextProvider } from "./context/Web3Context";
import Home from "./views/home";
import Main from "./views/main";
import Rsrv from "./views/rsrv";
import "./App.css";

function App() {
  return (
    <Suspense>
      <Web3ContextProvider>
        <Router>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/main" component={Main} />
            <Route path="/rsrv" component={Rsrv} />
            <Redirect to="/rsrv" />
          </Switch>
        </Router>
      </Web3ContextProvider>
    </Suspense>
  );
}

export default App;
