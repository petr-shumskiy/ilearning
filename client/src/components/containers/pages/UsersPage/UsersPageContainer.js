import React, {useEffect, useState} from "react";
import {Checkbox} from '@material-ui/core'
import withServices from "../../../hoc/withServices";
import {connect} from "react-redux";
import {
  getUsers,
  selectUserById,
  selectAllUsers,
  blockUsers,
  deleteUsers,
  validateUser
} from "../../../../actions/actions";
import {bindActionCreators} from "redux";
import {toast, ToastContainer} from "react-toastify";
import {Spinner} from "react-bootstrap";


function UsersPageContainer(props) {
  const {
    usersService,
    userList, token, currentUserId,
    blockUsers, deleteUsers, getUsers} = props

  const [idList, setId] = useState([])

  useEffect( () => {
     getUsers(token)

  }, [usersService, getUsers, token])

  const notifySelcetSomeone = (condition) => {
    if (condition) {
      toast('Select someone', {
        type: "warning",
        position: "top-left",
        autoClose: 2000
      })
    }
  }
  const onChecked = (id, event) => {
    if (event.target.checked) {
      setId([...idList, id])
    } else {
     const ind = idList.findIndex((currrentId) => currrentId === id)
      setId([
        ...idList.slice(0, ind),
        ...idList.slice(ind+1)
      ])
    }
  }

  const onCheckedAll = (event) => {
    const allIds = []
    userList.map((user) => allIds.push(user.id))
    if (event.target.checked) {
      setId(allIds)
    }
    else {
      setId([])
    }
  }

  const onDeleted = (idList) => {
    notifySelcetSomeone(!idList.length)
    deleteUsers(token, idList)
    getUsers(token)
  }

  const onBlocked = (idList, isBlocked) => {
    notifySelcetSomeone(!idList.length)
    blockUsers(token, idList, isBlocked)
  }
  
  if (!userList.length) {
    return (
      <div className="container">
      <div className="row ">
        <div className="d-flex col-sm-12 justify-content-center" style={{marginTop: 200}}>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      </div>
      </div>
    )
  }

  return (
    <div className="container justify-content-center mt-5">
      <div className="row mb-1 ml-2">
        <button className="btn btn-danger mr-2" onClick={() => onDeleted(idList)}>
          delete
        </button>
        <button className="btn btn-dark mr-2" onClick={() => onBlocked(idList, true)}>
          block
        </button>
        <button className="btn btn-success" onClick={() => onBlocked(idList, false)}>
          unblock
        </button>
      </div>
      <div className="row justify-content-center">

          <table className="table">
            <thead> 
            <tr>
              <th scope="col" style={{width: 20}} className="pb-1">
                <Checkbox
                  onChange={onCheckedAll}/>
              </th>
              <th scope="col">id</th>
              <th scope="col">name</th>
              <th scope="col">email</th>
              <th scope="col">last login</th>
              <th scope="col">status</th>
            </tr>
            </thead>
            <tbody>
            {userList.map((user, ind) => {
              return (
                <tr key={ind} className={user.id === currentUserId ? "table-active": null}>
                  <th scope="col">
                    <Checkbox
                      checked={idList.includes(user.id)}
                      onChange={(e) => onChecked(user.id, e)}
                      className="p-0"
                    />
                  </th>
                  <th scope="col">{user.id}</th>
                  <th scope="col">{user.name}</th>
                  <th scope="col">{user.email}</th>
                  <th scope="col">{user.last_login}</th>
                  <th scope="col">{user.is_blocked ? 'blocked': 'not blocked'}</th>
                </tr>
              )
            })}
            </tbody>
          </table>
          </div>
      <ToastContainer/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userList: state.userList,
    isAllSelected: state.isAllSelected,
    idList: state.idList,
    token: state.token,
    currentUserId: state.currentUserId,
  }
}

const mapDispatchToProps = (dispatch, {usersService}) => {
  return bindActionCreators({
    getUsers: getUsers(usersService),
    selectUserById: selectUserById(usersService),
    selectAllUsers: selectAllUsers(usersService),
    blockUsers: blockUsers(usersService),
    deleteUsers: deleteUsers(usersService),
    validateCurrentUser: validateUser(usersService)
  }, dispatch)
}


export default withServices(connect(mapStateToProps, mapDispatchToProps)(UsersPageContainer))