import React, { Component } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';


export default class RecommendationBar extends Component {
  constructor(){
    super();
    this.state = {
      query: '',
      recommendations: []
    }
    this.onQueryChange = this.onQueryChange.bind(this);
    this.onGoSubmit = this.onGoSubmit.bind(this);
  }

  onQueryChange(e) {
    e.preventDefault();
    this.setState({query: e.target.value});
  }

  onGoSubmit(e) {
    e.preventDefault();
    let mockdata = require('../../mock.json')
    // let query = this.state.query.replace(/\s+/g, '+');
    // There's an issue with CORS permissions
    // let key = "127938-BookBudd-KF4QNLL5";
    // let url = `https://tastedive.com/api/similar?q=${query}&type=books&info=1&k=${key}`
    // fetch(url, {
    //   method: 'GET',
    //   headers: { 'Content-Type': 'application/json' },
    // }).then((response) => {return response.json()})
    // .then((data) => console.log(data.results))
    this.getBookDetails(mockdata.Similar.Results)
  }
  
  getBookDetails(recommendations){
    recommendations.forEach(book => {
      this.addBookDetails(book);
    });
  }

  addBookDetails(book){
    fetch(`https://openlibrary.org/search.json?title=${book.Name.replace(/\s+/g,'+')}`, {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((data) => {
      this.setState(prevState => ({
        recommendations: [...prevState.recommendations,
          {'isbn': data.docs[0].isbn[0], 'title': book.Name, 'description': book.wTeaser}]
      }))
    });
  }

  render() {
    return (
      <Form inline>
        <FormControl
          type="text"
          placeholder="Find recommendations for..."
          onKeyUp={this.onQueryChange}
          className="mr-sm-2"
        />
        <Button variant="outline-info" onClick={this.onGoSubmit}>Go</Button>
        <div>
          {this.state.recommendations.map(book => (
            <div>{JSON.stringify(book)}</div>
          ))}
        </div>
      </Form>
    )
  }
}