import React from "react";
import {Link} from 'react-router-dom'

function RegisterPage({inputeHandler, submitHandler, password}) {
  return (
    <div className="center row justify-content-center">
      <div className="col-6 align-self-center">
        <div className="logreg-forms">
          <form className="form-signup" onSubmit={submitHandler}>
            <h1 style={{textAlign: 'center'}} className="mb-4">Registration</h1>
            <input
              type="text"
              className="form-control"
              placeholder="Full name"
              name="name"
              required={true}
              onChange={inputeHandler}
            />
            <input
              type="email"
              id="user-email"
              className="form-control"
              placeholder="Email address"
              required={true}
              name="email"
              onChange={inputeHandler}
            />
            <input
              type="password"
              className="form-control"
              pattern="[\wа-я]{6,}"
              title="at least 6 characters"
              placeholder="Password"
              required={true}
              name="password"
              onChange={inputeHandler}
            />
            <input
              type="password"
              className="form-control"
              pattern={password || ''}
              title={'passwords must match'}
              placeholder="Repeat Password"
              required={true}
              name="passwordValidation"
              onChange={inputeHandler}
            />

            <button
              className="btn btn-primary btn-block mt-2">
              <i className="fa fa-user-plus"/> Sign Up
            </button>
            <Link to="/login" id="cancel_signup"><i className="fa fa-angle-left"/> Back</Link>
        </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage