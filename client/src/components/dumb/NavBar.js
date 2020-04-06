import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {deauthenticate} from "../../actions/actions";
import withServices from "../hoc/withServices";

function NavBar({localStorageName, deauthenticate, token}) {
  return (
    <nav className="navbar navbar-expand-lg  sticky-top navbar-dark bg-dark justify-content-end">
          <ul className="navbar-nav w-100 nav-justified p-0, mr-0">
            <li className="nav-item navbar-brand p-0 mr-0">
              <NavLink className="nav-link p-0 mr-0" to="/">
                <button className="btn btn-dark btn-lg ">
                  Admin panel
                </button>
              </NavLink>
            </li>
            <li className="nav-item navbar-brand p-0 mr-0">
              <NavLink className="nav-link p-0 mr-0" to='/collections'>
                <button className="btn btn-dark btn-lg">
                  Collections
                </button>
              </NavLink>
            </li>
            <li className="nav-item navbar-brand p-0 mr-0">
              <button
                className="btn btn-dark btn-lg"
                onClick={() => deauthenticate(token, localStorageName)}
              >
                Logout
              </button>
            </li>
          </ul>
      </nav>
  )
}

const mapStatetoProps = (state) => {
  return {
    localStorageName: state.localStorageName,
    token: state.token
  }
}




export default withServices(connect(mapStatetoProps, {deauthenticate})(NavBar))