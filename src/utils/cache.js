import storage from 'good-storage'

const USER_KEY = '__user__'
const TOKEN_KEY = '__token__'

export function saveUser(user) {
  storage.set(USER_KEY, user)
  return user
}

export function getUser() {
  return storage.get(USER_KEY, {})
}

export function saveToken(_token) {
  storage.set(TOKEN_KEY, _token)
  return _token
}

export function getToken() {
  return storage.get(TOKEN_KEY, '')
}
