import React, { Component } from 'react'; 
import Marked from 'marked';
import Markmirror from 'react-markmirror';
import { connect } from 'react-redux';

class Upload extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      content: '', 
      title: '',
      saved: false
    };
  }

  save = (e) => {
    e.preventDefault();
    let error = false;
    fetch('http://localhost:8080/api/story', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        author: this.props.author.username,
        title: this.state.title,
        content: this.state.content
      })
    }).then((response) => {
      switch (response.status) {
        case 200:
          break;
        default:
          error = true;
          break;
      }
      return response.json();
    }).then((data) => {
        if(!error){
          this.setState({saved: true})
        }
    })
  }

  handleChange = (content) => {
    this.setState({content});
  };

  handleTitleChange = (e) => {
    this.setState({title: e.target.value});
  }

  renderPreview = (markdown) => {
    return Marked(markdown);
  }

  renderToolbar = (markmirror, renderButton) => (
    <div className="markmirror__toolbar myapp__toolbar">
      {renderButton('h1')}
      {renderButton('h2')}
      {renderButton('h3')}
      {renderButton('bold')}
      {renderButton('italic')}
      {renderButton('quote')}
      {renderButton('full')}
      {renderButton('preview')}
    </div>
  );

  render() {
    return (
      <React.Fragment>
        <h1>Feeling Creative?</h1>
        <h2>Create Your Stories Here</h2>
        <form id="story">
          <label>Title</label>
          <input type="text" id="title" name="title" value={this.state.title} onChange={e => this.handleTitleChange(e)}/>
          <button type="button" onClick={(e) => this.save(e)} disabled={this.state.saved}>
            {this.state.saved ? <b>Saved</b> : <b>Create Story</b>}
          </button>
        </form>
        <Markmirror form="story" value={this.state.content} onChange={this.handleChange} renderToolbar={this.renderToolbar} onPreview={this.renderPreview}/>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state){
  return {
    author: state.user
  }
}

export default connect(mapStateToProps)(Upload);