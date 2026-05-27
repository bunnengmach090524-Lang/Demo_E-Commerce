import api from './BaseApi'

export const UserApi = {
  login(credentials) {
    return api.post('/auth/login', {
      username: credentials.username,
      password: credentials.password,
      expiresInMins: 60
    })
  },

  getProfile(userId) {
    return api.get(`/users/${userId}`)
  },

  getAll() {
    return api.get('/users')
  }
}
