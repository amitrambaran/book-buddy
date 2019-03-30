import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AddTodo extends Component {
    state = {
        title: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({title: ''});

    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })
  render() {
    return (
      <form onSubmit ={this.onSubmit} style={{ display: 'flex' }}>
        <input 
            type = "text" 
            name="title" 
            style = {{flex: '10', padding: '5px' }}
            placeholder="Add books to your wishlist ..." 
            value = {this.state.title}
            onChange = {this.onChange}
        />
        <input 
            type = "submit"
            value = "Add"
            className = "btn" 
            style = {{flex: '1'}}
        />
      </form>
    )
  }
}

AddTodo.propTypes = {
  addTodo: PropTypes.array.isRequired
}

export default AddTodo
