import React, { Component } from 'react';

export default class Review extends Component {

  render() {
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <h6>{this.props.reviewer}</h6>
          <h6>{this.props.score}/5</h6>
        </div>
        {this.props.comment}
      </div>
    )
  }
}