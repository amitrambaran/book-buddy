import { LOGIN, LOGOUT, ADDBOOKS, LIKEBOOK, DISLIKEBOOK } from '../constants/action-types'

function rootReducer(state, action) {
  switch (action.type){
    case LOGIN:
      return {...state, user: action.payload}
    case LOGOUT:
      return {user: null, books: []}
    case ADDBOOKS:
      return {...state, book: [...state.books, action.payload]}
    case LIKEBOOK:
      return {...state, user: {...state.user, likes: [...state.user.likes, action.payload]}}
    case DISLIKEBOOK:
      return {...state, user: {...state.user, dislikes: [...state.user.dislikes, action.payload]}}
    default:
      return state;
  }
};

export default rootReducer;