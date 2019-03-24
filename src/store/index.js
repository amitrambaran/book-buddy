import { createStore } from 'redux';
import rootReducer from '../reducers/index';
import StateLoader from '../stateloader';

const stateLoader = new StateLoader();

let store = createStore(rootReducer, stateLoader.loadState());

store.subscribe(() => stateLoader.saveState(store.getState()));

export default store;