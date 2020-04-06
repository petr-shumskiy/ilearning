const initailState = {
  currentUserId: null,
  isCurrentUserValid: true,
  loading: null,
  registerName: null,
  registerEmail: null,
  registerPassword: null,
  registerValidation: null,
  localStorageName: 'tokenData', //todo secure somewhow
  token: localStorage.getItem('tokenData'),
  userList: [],
  idList: [],
  collectionList: []
}

const updateIdList = (array_, id, isSelected) => {
  let array = array_.concat([])

  if (Array.isArray(id)) {
    array = array.concat(id)
    return array
  }

  if (!isSelected) {
    const ind = array.findIndex((id_) => id_ === id )
    array.splice(ind, 1)

    return array
  }

  array.push(id)
  return array
}

const getAllIds = (usersList, isSelected) => {
  const ids = []
  if (!isSelected) {
    return ids
  }
  usersList.map((user) => ids.push(user.id))
  return ids
}

const reducer = (state=initailState, action) => {
  switch (action.type) {
    case 'LOGIN_SET_DATA':
    return {
      ...state,
      loginEmail: action.email,
      loginPassword: action.password
    }

    case 'REGISTER_SET_DATA':
      return {
        ...state,
        registerName: action.name,
        registerEmail: action.email,
        registerPassword: action.password,
        registerValidation: action.passwordValidation
      }

    case 'AUTHENTICATE':
      return {
        ...state,
        token: action.token,
      }

    case 'DEAUTHENTICATE':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      }

    case 'FETCH_USERS_SUCCESS': {
      const idList = []
      action.userList.map((user) => {
        if (user.is_selected) {
          idList.push(user.id)
        }
      })

      return {
        ...state,
        userList: action.userList,
        idList: updateIdList(state.idList, idList, true),
      }
    }

    case 'UPDATE_USERS_SELECT_ONE':
      const ind = state.userList.findIndex((user) => user.id === action.user.id)

      return {
        ...state,
        userList: [
          ...state.userList.slice(0, ind),
          action.user,
          ...state.userList.slice(ind+1)
        ],
        idList: updateIdList(state.idList, action.user.id, action.user.is_selected)
      }

    case 'UPDATE_USERS_SELECT_ALL':
      return {
        ...state,
        userList: state.userList.map(
          (user) => {
            return {...user, is_selected: action.isSelected}
          }),
        idList: getAllIds(state.userList, action.isSelected)
      }

    case 'USERS_BLOCK':
      return {
        ...state,
        userList: state.userList.map(
          (user) => {
            if (action.idList.includes(user.id)) {
              return {...user, is_blocked: action.isBlocked}
            }
          return user
          }
            )
      }

    case 'USERS_DELETE':

      return {
        ...state,
        userList: state.userList.filter((user) => {
          if (!action.idList.includes(user.id)) {
            return user
          }
        })
      }

    case 'VALIDATE_CURRENT_USER':
      return {
        ...state,
        currentUserId: action.currentUserId,
        isCurrentUserValid: action.isValid,
        loading: action.loading
      }

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading
      }

    case 'FETCH_COLLECTIONS':
      return {
        ...state,
        collectionList: action.collectionList
      }


    default:
      return state
  }
}

export default reducer