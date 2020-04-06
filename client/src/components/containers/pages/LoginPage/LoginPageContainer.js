import React, {useState} from "react";
import LoginPage from "../../../dumb/LoginPage";
import withServices from "../../../hoc/withServices";
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {connect} from "react-redux";
import {authenticate} from "../../../../actions/actions";


function LoginPageContainer({localStorageName, authService, authenticate}) {

  const [user, setUser] = useState({})

  const errorNotify = (message) => {
    toast(message, {
      type: "error",
      autoClose: 4000
    })
  }

  const inputHandler = (event) => {
   setUser({...user, [event.target.name]: event.target.value})
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const data = await authService.login(user)
        authenticate(data.token, localStorageName)
    } catch (e) {
      errorNotify(e.message)
    }
  }

  const facebookAuthenticateHandler = async (res) => {
    try {
      const token = await authService.facebookAuthenticate(res)
      authenticate(token, localStorageName)
    } catch (e) {
      errorNotify(e.message)
      }
    }


  const googleAuthenticateHandler = async (res) => {
    try {
      const {expires_in} = res.tokenObj
      const {profileObj} = res
      const token = await authService.googleAuthenticate({...profileObj, expires_in})
      authenticate(token, localStorageName)
    } catch (e) {
      errorNotify(e.message)
    }
  }

  return (
    <div>
      <LoginPage inputHandler={inputHandler}
                 submitHandler={submitHandler}
                 facebookAuthenticateHandler={facebookAuthenticateHandler}
                 googleAuthenticateHandler={googleAuthenticateHandler}

      />
      <ToastContainer
        position="top-center"
        closeOnClick={true}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    localStorageName: state.localStorageName,
  }
}





export default withServices(connect(mapStateToProps, {authenticate})(LoginPageContainer))