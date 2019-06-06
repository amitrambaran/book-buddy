import React, { Component } from 'react';
import Stars from '../bookshelf/stars';

export default class Review extends Component {

  render() {
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <h6>{this.props.reviewer}</h6>
          <Stars score={this.props.score} style={{backgroundColor: '#e6e6e6'}}/>
        </div>
        {this.props.comment}
      </div>
    )
  }
}