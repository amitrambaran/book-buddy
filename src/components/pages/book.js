import React, { Component } from 'react';
import Axios from 'axios';

export default class book extends Component {
  state = {
    id: ''
  }

  // Triggers on component mount.
  componentDidMount() {
    var id = window.location.pathname.split('/')[2]
    this.setState({ id: id })
    
    // Get API information here...
    Axios.get('https://jsonplaceholder.typicode.com/todos').then(res =>
      console.log(res.data)
    )
  }

  render() {
    return (
      <React.Fragment>
        <h1>Book Information</h1>
        <p>Page shows a given book's title, author, rating, desc, where to buy, etc..</p>
        <br/>
        <p>Book ID: { this.state.id }</p>
    </React.Fragment>
    )
  }
}
