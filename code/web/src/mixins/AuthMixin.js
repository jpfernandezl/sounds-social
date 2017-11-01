import {
  logOut,
  doLogin,
  createUser,
} from '../api/AuthApi'

export default {
  methods: {
    authLogIn (username, password) {
      return doLogin(username, password)
    },
    authCreateUser (username, password) {
      return createUser(username, password)
    },
    authLogOut () {
      this.$router.push('/')
      logOut().then(() => window.location.reload())
    },
  },
}
