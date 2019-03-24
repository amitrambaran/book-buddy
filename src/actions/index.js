import { LOGIN, ADDBOOKS } from '../constants/action-types'

export function loginUser(payload) {
  return { type: LOGIN, payload }
}

export function addBooks(payload) {
  return { type: ADDBOOKS, payload}
}