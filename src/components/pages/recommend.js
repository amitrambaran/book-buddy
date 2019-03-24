import React, { Component } from 'react'
import RecommendationBar from '../recommendationbar/recommendation';

export default class recommend extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>User Recommendations</h1>
        <RecommendationBar/>
      </React.Fragment>
    )
  }
}
