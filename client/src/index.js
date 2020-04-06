import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/containers/App";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import ServicesContext from "./components/context/ServicesContext";
import UsersService from "./services/usersService";
import AuthService from "./services/authService";
import CollectionService from "./services/collectionService";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import ErrorBoundary from "./components/containers/ErrorBoundary";
import store from "./store";

const usersService = new UsersService()
const authService = new AuthService()
const collectionService = new CollectionService()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <Router>
          <ServicesContext.Provider value={{usersService, authService, collectionService}}>
            <App />
          </ServicesContext.Provider>
        </Router>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

