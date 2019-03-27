import React, { Component } from 'react'
import Bookshelf from '../bookshelf/bookshelf';

export class homepage extends Component {
  render() {
    return (
        <React.Fragment>
            <h1>Homepage</h1>
            <Bookshelf books={ this.props.books }/>

            <div class="break"></div>

            <div class="main-panel-container">
              <header>Featured Books</header>
              <hr></hr>
              ... Books here ...
            </div>

            <div class="break"></div>

            <div class="main-panel-container">
              <header>Top Books</header>
              <hr></hr>
              ... Books here ...
            </div>

            <div class="break"></div>

            <div class="main-panel-container">
              <header>Indie Authors</header>
              <hr></hr>
              ... Books here ...
            </div>
        </React.Fragment>
    )
  }
}

export default homepage
