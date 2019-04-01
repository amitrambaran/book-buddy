import React, { Component } from 'react'

export default class about extends Component {
  render() {
    return (
      <React.Fragment>
      <h1>About</h1>
      <ul style={{listStyle: 'none'}}>
      This app was powered by:
        <li>
          <a href="https://openlibrary.org/developers/api"> OpenLibrary API</a>
        </li>
        <li>
          <a href="https://tastedive.com/read/api">TasteDive Recommendation API</a>
        </li>
      </ul>
      <h2>Team Members</h2>
      <ul style={{listStyle: 'none'}}>
        <li>Peter Nguyen</li>
        <li>Lionel Pereira</li>
        <li>Chloe Ierullo</li>
        <li style={{ fontSize: '0.1em'}}>Amit Rambaran</li>
        <li style={{ fontSize: '0.1em'}}>Mohamad Al-Jaf</li>
        <li style={{ fontSize: '0.1em'}}>Sai Nidumukkala</li>
      </ul>
    </React.Fragment>
    )
  }
}
