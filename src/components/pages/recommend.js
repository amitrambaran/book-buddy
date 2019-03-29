import React, { Component } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import Book from '../bookshelf/book';

export default class Recommend extends Component {
  constructor(props){
    super(props);
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
    this.setState({recommendations: []});
    let query = this.state.query.replace(/\s+/g, '+');
    let key = "127938-BookBudd-1BYV73T6";
    let baseUrl = "https://cors-anywhere.herokuapp.com/";
    let url = `https://tastedive.com/api/similar?q=${query}&type=books&info=1&k=${key}`
    fetch(baseUrl + url)
    .then((response) => {return response.json()})
    .then((data) => this.getBookDetails(data.Similar.Results));
  }

  contains(book, list){
    for(let i = 0; i < list.length; i++){
      if (list[i].ISBN === book.ISBN){
        return true;
      }
    }
    return false;
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
      let bookToRecommend = {'ISBN': data.docs[0].isbn[0], 'title': book.Name, 'description': book.wTeaser};
      if (!this.contains(bookToRecommend, this.props.user.likes) &&
       !this.contains(bookToRecommend, this.props.user.dislikes)) {
         this.setState(prevState => ({
           recommendations: [...prevState.recommendations,bookToRecommend]
         }))
       }
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1>User Recommendations</h1>
        <Form inline style={{justifyContent: 'center'}}>
          <FormControl
            type="text"
            placeholder="Find recommendations for..."
            onKeyUp={this.onQueryChange}
            className="mr-sm-2"
          />
          <Button variant="outline-info" onClick={this.onGoSubmit}>Go</Button>
          <div style={{width: '80%', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexFlow: 'wrap'}}>
            {this.state.recommendations.map(book => (
              <Book key={book.isbn} likeable userID={this.props.user.ID} isbn={book.ISBN} title={book.title} description={book.description}/>
            ))}
          </div>
        </Form>
      </React.Fragment>
    )
  }
}