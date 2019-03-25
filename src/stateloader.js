const url = 'thebookbuddy';

export default class StateLoader {
  saveState(state){
    let serializedState = JSON.stringify(state);
    if (serializedState === null || serializedState === {} ) {
      return this.initialState();
    } else {
      localStorage.setItem(url, serializedState);
    }
  }
  
  loadState(){
    let serializedState = localStorage.getItem(url);
    if(serializedState === null || serializedState === {}){
      return this.initialState();
    } else {
      return JSON.parse(serializedState);
    }
  }

  initialState() {
    return {
      user: null,
      books: []
    };
  }
}