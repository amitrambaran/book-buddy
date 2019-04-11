import React, { Component } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import Book from '../bookshelf/book';

export default class Recommend extends Component {
  constructor(props){
    super(props);
    let param = window.location.pathname.split('/')[2];
    param = (param) ? param.replace(/_/g, ' ') : '';
    this.state = {
      query: param,
      recommendations: [],
      teaser: '',
      isLoading: false,
      empty: false
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
    this.setState({
      isLoading : true,
      empty : false,
      recommendations: [],
      teaser: ''
    })
    let query = this.state.query.replace(/\s+/g, '+');
    let key = "127938-BookBudd-1BYV73T6";
    let baseUrl = "https://cors-anywhere.herokuapp.com/";
    let url = `https://tastedive.com/api/similar?q=${query}&type=books&info=1&k=${key}`
    fetch(baseUrl + url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      this.setState({isLoading: false});
      if(data.Similar.Results.length === 0) {
        this.setState({empty: true});
      } else {
        this.setState({
          empty: false,
          teaser: data.Similar.Info[0].wTeaser
        });
        this.getBookDetails(data.Similar.Results)
      }
    });
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
    const baseUrl = 'https://cors-anywhere.herokuapp.com/';
    fetch(`${baseUrl}https://openlibrary.org/search.json?title=${book.Name.replace(/\s+/g,'+')}`, {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((data) => {
      let bookToRecommend;
      try {
        for(let i = 0; i < data.docs.length; i++){
          if(data.docs[i].isbn && data.docs[i].isbn.length && data.docs[i].cover_i){
            bookToRecommend = {'ISBN': data.docs[i].isbn[0], 'title': book.Name, 'description': book.wTeaser, 'cover': data.docs[i].cover_i};
            break;
          }
        }
      } catch (error) {
        return;
      }
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
        <div className="break"></div>
        <Form inline style={{ justifyContent: 'center' }} onSubmit={this.onGoSubmit}>
          <FormControl
            type="text"
            placeholder="Enter a book"
            defaultValue={this.state.query}
            onKeyUp={this.onQueryChange}
            style={{maxWidth: '15em'}}
            className="mr-sm-2"
          />
          <Button variant="info" onClick={this.onGoSubmit}>Go</Button>
          { this.state.teaser.length > 0 &&
            <p style={{marginTop: '1rem', fontSize: '0.7em'}}>{this.state.teaser}</p>
          }
          <div className="break"></div>
          {this.state.recommendations.length > 0 &&
            <div className="main-panel-container book-container">
              {this.state.recommendations.map(book => (
                <Book
                key={`${book.isbn}-${book.title}`}
                likeable
                userID={this.props.user.ID}
                isbn={book.ISBN}
                title={book.title}
                description={book.description}
                cover={book.cover}
                />
                ))}
            </div>
          }
        </Form>

        <div className="break"></div>

        {this.state.isLoading &&
          <h3>Loading...</h3>
        }
        { this.state.empty &&
          <h3>No Books available<br/>Try again</h3>
        }
      </React.Fragment>
    )
  }
}