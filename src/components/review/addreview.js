import React, { Component } from 'react';
import apiURL from '../../api';
import { Button, FormControl, Form } from 'react-bootstrap';

export default class AddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      score: 5,
      sent: false,
      error: ''
    }
    this.onCommentChange = this.onCommentChange.bind(this);
    this.sendReview = this.sendReview.bind(this);
    this.onScoreChange = this.onScoreChange.bind(this);
  }

  onScoreChange = (e) => {
    e.preventDefault();
    this.setState({ score: e.target.value })
  }

  onCommentChange = (e) => {
    e.preventDefault();
    this.setState({ comment: e.target.value })
  }

  sendReview = (e) => {
    e.preventDefault();
    fetch(`${apiURL}/api/review/${this.props.storyID}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        comment: this.state.comment,
        score: this.state.score,
        reviewer: this.props.username
      })
    }).then((response) => {
      switch (response.status) {
        case 200:
          break;
        default:
          this.setState({error: 'Error adding review'})
          break;
      }
      return;
    })
  }

  render() {
    return (
      <div style={{maxWidth: '40em', margin: '0 auto'}}>
          <h6>{this.state.error}</h6>
          <FormControl as='textarea' value={this.state.comment} onChange={this.onCommentChange}/>
          <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '1em'}}>
            <Form.Control
              style={{width: '75px', marginRight: '1em'}}
              as="select" value={this.state.score}
              onChange={this.onScoreChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Control>
            <Button
              variant={this.state.comment.length ? 'primary' : 'secondary' }
              disabled={!this.state.comment.length}
              onClick={this.sendReview}
            >Add</Button>
          </div>
      </div>
    )
  }
}