import React, { Component } from 'react'

export default class library extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>User Library</h1>

        <div class="break"></div>

        <div class="main-panel-container">
          <header>Favourited Books</header>
          <hr></hr>
          ... Books here ...
        </div>

        <div class="break"></div>

        <div class="main-panel-container">
          <header>Liked Books</header>
          <hr></hr>
          ... Books here ...
        </div>

        <div class="break"></div>

        <div class="main-panel-container">
          <header>Want to Read</header>
          <hr></hr>
          ... Books here ...
        </div>

        <div class="break"></div>

        <div class="main-panel-container">
          <header>Your Uploads</header>
          <hr></hr>
          ... Books here ...
        </div>
    </React.Fragment>
    )
  }
}
