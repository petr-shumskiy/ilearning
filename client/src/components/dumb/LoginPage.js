import React from "react";
import {Link} from "react-router-dom";
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from "react-google-login";


function LoginPage({inputHandler, submitHandler,
                     facebookAuthenticateHandler, googleAuthenticateHandler}) {
  return (
    <div className="center row justify-content-center">
      <div className="col-6 align-self-center">
        <div className="logreg-forms">
        <form
          className="form-signin"
          onSubmit={submitHandler}
        >
          <h1 className="h3 mb-3 font-weight-normal" style={{textAlign: 'center'}}>
            Sign in
          </h1>
          <div className="d-flex">
            <FacebookLogin
              appId="1163865873949536"
              autoLoad={false}
              fields="name,email"
              callback={facebookAuthenticateHandler}
              textButton="with Facebook  "
              icon=" fa fa-facebook "
              buton
              cssClass="logreg-forms facebook-btn social-btn h-auto"
            >
            </FacebookLogin>

            <GoogleLogin
              clientId="241755346247-recl9ci3k6jspvkta6o71niu6flga9jj.apps.googleusercontent.com"
              onSuccess={googleAuthenticateHandler}
              onFailure={googleAuthenticateHandler}
              autoLoad={false}
              responseType='token'
              className="logreg-forms  social-btn google-btn h-auto"
            >
              with Google+
            </GoogleLogin>

          </div>
          <p style={{textAlign: 'center'}}> OR </p>
          <input
            type="email"
            className="form-control"
            placeholder="Email address"
            required={true}
            name="email"
            onChange={inputHandler}
          />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required={true}
              name="password"
              onChange={inputHandler}
            />
              <button
                className="btn btn-success btn-block"
                type="submit">
                <i className="fa fa-sign-in"/> Sign in
              </button>
              <hr/>
              <Link to="/register" style={{textDecoration: 'none'}}>
                <button
                  className="btn btn-primary btn-block"
                  type="button">
                  <i className="fa fa-user-plus"/> Sign up New Account
                </button>
              </Link>
        </form>
      </div>
    </div>
    </div>
  )
}

export default LoginPage