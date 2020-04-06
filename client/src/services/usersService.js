import axios from 'axios'

class UsersService {
  getUsers = async (token) => {
    const {data} = await axios.get('/api/users', {
      headers: {'Authorization': token}
    })
    return data.users
  }

  validateUser = async (token) => {
    const {data} = await axios.get('api/users/validate', {
      headers: {'Authorization': token}
    })
    return {currentUserId: data.userId, isValid: data.isValid}
  }


  deleteUsers = async (token, idList) => {
    await axios.delete('/api/users/delete', {
      data: {idList},
      headers: {'Authorization': token}
    })
   }

  blockUsers = async (token, idList, isBlocked) => {
    await axios.put('api/users/block', {
      idList,
      isBlocked
    }, {
      headers: {
        'Authorization': token
      }
    })
  }

  selectUsersById = async (token, id, isSelected) => {
    const {data} = await axios.put(`api/users/select/${id}`, {
      isSelected
    }, {
      headers: {
        'Authorization': token
      }
    })
    return data.user
  }

  selectAllUsers = (token, isSelected) => {
    axios.put('api/users/select-all', {
      isSelected
    }, {
      headers: {
        'Authorization': token
      }
    })
  }
}

export default UsersService