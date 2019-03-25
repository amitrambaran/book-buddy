import { LOGIN } from '../constants/action-types'

function rootReducer(state, action) {
  console.log(action)
  switch (action.type){
    case LOGIN:
      return {...state, user: action.payload}
    default:
      return state;
  }
};

export default rootReducer;