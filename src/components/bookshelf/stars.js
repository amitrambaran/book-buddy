import React, { Component } from 'react';


export default class Stars extends Component {

  constructor(props) {
    super(props);
    let fullStars = Math.floor(this.props.score);
    let halfStars = Math.ceil(this.props.score -Math.floor(this.props.score));
    let emptyStars =  5 - fullStars - halfStars;

    this.state = {
      full: fullStars,
      half: halfStars,
      empty: emptyStars
    }

  }

  fullStars = () => {
    let full = [];
    for(let i = 0; i < this.state.full; i++){
      full.push(<i style={{color: '#f9ee11'}} className="fas fa-star"/>)
    }
    return full;
  }

  halfStars = () => {
    let half = [];
    for(let i = 0; i < this.state.half; i++){
      half.push(<i style={{color: '#f9ee11'}} className="fas fa-star-half-alt"/>)
    }
    return half;
  }

  emptyStars = () => {
    let empty = [];
    for(let i = 0; i < this.state.empty; i++){
      empty.push(<i style={{ color: 'grey'}} className="fas fa-star"/>)
    }
    return empty;
  }

  render() {


    return (
      <div style={{borderRadius: '50px', ...this.props.style}}>
        {this.fullStars()}
        {this.halfStars()}
        {this.emptyStars()}
      </div>
    )

  }

}

