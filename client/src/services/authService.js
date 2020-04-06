import axios from 'axios'

class AuthService {
  login = async (user) => {
    try {
      const {data} = await axios.post(
        '/api/auth/login',
        user
      )
      return data

    } catch (e) {
      throw new Error(e.response.data.error)
    }
  }

  // todo facebook and google authenticate very similar, create function
  facebookAuthenticate = async (user) => {
    try {
      const {data} = await axios.post(
        '/api/auth/facebook',
        user
      )
      return data.token
    } catch (e) {
      throw new Error(e.response.data.error)
    }
  }

  googleAuthenticate = async (user) => {
    try {
      const {data} = await axios.post(
        '/api/auth/google',
        user
      )
    return data.token
    } catch (e) {
      console.log(e)
    }
  }

  register = async (user) => {
    try {
      const {data} = await axios.post(
      '/api/auth/register',
      user
    )
      return data
    } catch (e) {
      throw new Error(e.response.data.error)
    }
  }
}
export default AuthService