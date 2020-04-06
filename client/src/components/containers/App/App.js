import React, {useEffect} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import RegisterPageContainer from "../pages/RegisterPage";
import LoginPageContainer from "../pages/LoginPage";
import './App.css'
import UsersPageContainer from "../pages/UsersPage";
import CollectionPageContainer from "../pages/CollectionPage";
import {connect} from "react-redux";
import NavBar from "../../dumb/NavBar";
import {bindActionCreators} from "redux";
import withServices from "../../hoc/withServices";
import {validateUser} from "../../../actions/actions";


function App({token,
               isCurrentUserValid, validateCurrentUser}) {


  useEffect(() => {
    async function validate() {await validateCurrentUser(token)}
    validate()
  }, [token, validateCurrentUser])


  if (!token || !isCurrentUserValid){  //todo logout if you has been deleted or blocked, do more complicated condition
    return (
      <Switch>
        <Route path='/login' component={LoginPageContainer}/>
        <Route path='/register' component= {RegisterPageContainer}/>
        <Redirect to='/login'/>
      </Switch>
    )
  }
  return (
    <div>
      <NavBar/>
      <Switch>
        <Route path="/collections" component={CollectionPageContainer}/>   {/*todo add dynamic id*/}
        <Route path='/' exact component={UsersPageContainer}/>  {/* todo change path for admins only */}
        <Redirect to='/' />
      </Switch>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    token: state.token,
    currentUserId: state.currentUserId,
    isCurrentUserValid: state.isCurrentUserValid,
  }
}

const mapDispatchToProps = (dispatch, {usersService}) => {
  return bindActionCreators({
    validateCurrentUser: validateUser(usersService),
  }, dispatch)
}


export default withServices(connect(mapStateToProps, mapDispatchToProps)(App))