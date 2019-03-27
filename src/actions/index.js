import { LOGIN, ADDBOOKS, LIKEBOOK, DISLIKEBOOK, LOGOUT } from '../constants/action-types'

export function loginUser(payload) {
  return { type: LOGIN, payload }
}

export function logoutUser(payload) {
  return { type: LOGOUT, payload }
}

export function addBooks(payload) {
  return { type: ADDBOOKS, payload}
}

export function likeBook(payload) {
  return { type: LIKEBOOK, payload }
}

export function dislikeBook(payload) {
  return { type: DISLIKEBOOK, payload }
}
