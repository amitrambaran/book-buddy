import React, { Component } from 'react'

export default class book extends Component {
  state = {
    id: ''
  }

  constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', this.handleLoad);
  }

  // Get API information here...
  handleLoad() {
    var id = window.location.pathname.split('/')[2]
    this.setState({ id: id })
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
