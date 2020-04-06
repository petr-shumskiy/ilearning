
// todo refactor file to auth-actions and users-actions

const authenticate = (token, localStorageName, currentUserId) => {
  localStorage.setItem(localStorageName, token)
  return {
    type: 'AUTHENTICATE',
    token,
    currentUserId
  }
}

const deauthenticate = (token, localStorageName) => async (dispatch) => {
  localStorage.removeItem(localStorageName)
  dispatch ({
    type: 'DEAUTHENTICATE'
  })
}

const validateUser = (usersService) => (token) => async (dispatch) => {
  if (!token) {
    return
  }
  try {
    dispatch({
    type: 'SET_LOADING',
    loading: true
  })
  const {currentUserId, isValid} = await usersService.validateUser(token)
    dispatch({
    type: 'VALIDATE_CURRENT_USER',
    loading: false,
    currentUserId,
    isValid
  })
  } catch (e) {
    dispatch({
      type:'SET_LOADING',
      loading: false
    })
  }
}

const getUsers = (usersService) => (token) => async (dispatch) => {
  const userList = await usersService.getUsers(token)
  dispatch({
    type: 'FETCH_USERS_SUCCESS',
    userList
  })
}

const selectUserById = (usersService) => (token, id, isSelected) => async (dispatch) => {
  const user = await usersService.selectUsersById(token, id, isSelected)
  dispatch({
    type: 'UPDATE_USERS_SELECT_ONE',
    user
  })
}

const selectAllUsers = (usersService) => (token, isSelected) => async (dispatch) => {
  await usersService.selectAllUsers(token, isSelected)
  dispatch({
    type: 'UPDATE_USERS_SELECT_ALL',
    isSelected
  })
}

const blockUsers = (usersService) => (token, idList, isBlocked) => async (dispatch) => {
  await usersService.blockUsers(token, idList, isBlocked)
  dispatch({
    type: 'USERS_BLOCK',
    idList,
    isBlocked
  })
}

const deleteUsers = (userService) => (token, idList) => async (dispatch) => {
  await userService.deleteUsers(token, idList)
  dispatch({
    type: 'USERS_DELETE',
    idList
  })
}

const getCollections = (collectionService) => (currentUserId) => async (dispatch) => {
  const collectionList = await collectionService.getAllCollections(currentUserId)
  dispatch({
    type: 'FETCH_COLLECTIONS',
    collectionList,
  })
  return false

}

export {
  authenticate,
  deauthenticate,
  getUsers,
  selectUserById,
  selectAllUsers,
  blockUsers,
  deleteUsers,
  validateUser,
  getCollections
}