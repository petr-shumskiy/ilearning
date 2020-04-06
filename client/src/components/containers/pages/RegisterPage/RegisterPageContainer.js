import React, {useState} from "react";
import RegisterPage from "../../../dumb/RegisterPage";
import withServices from "../../../hoc/withServices";
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function RegisterPageContainer({history, authService}) {

  const [user, setUser] = useState({})

  const inputHandler = (event) => {
    setUser({...user, [event.target.name]: event.target.value})
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try
    {
      const data = await authService.register(user)
      toast(data.message + ' you can login now', {
        position: "top-center",
        type: "success",
        autoClose: 5000
      })
      setTimeout(() => {history.push('/login')}, 5050)  // todo memory leak?
    } catch (e) {
      toast(e.message, {
        position: "top-center",
        type: "error"
      })
    }
  }

  return (
    <div>
      <RegisterPage
        inputeHandler={inputHandler}
        password={user.password}
        submitHandler={submitHandler}
      />
      <ToastContainer/>
    </div>
  )
}

export default withServices(RegisterPageContainer)