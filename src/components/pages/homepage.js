import React, { Component } from 'react'
import Bookshelf from '../bookshelf/bookshelf';

export class homepage extends Component {
  render() {
    return (
        <React.Fragment>
            <h1>Homepage</h1>
            <Bookshelf books={ this.props.books }/>
        </React.Fragment>
    )
  }
}

export default homepage
