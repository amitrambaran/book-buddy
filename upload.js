import React, { Component } from 'react'; 
import Marked from 'marked';
import Markmirror from 'react-markmirror';

export default class upload extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      code: '', 
      title: ''
    };
  }

  save = (e) => {
    e.preventDefault();
    console.log(this.state.title);
    console.log(this.state.code); 
  }

  handleChange = (code) => {
    this.setState({code});
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
          <button type="button" onClick={(e) => this.save(e)}>Create Story</button>
        </form>
        <Markmirror form="story" value={this.state.code} onChange={this.handleChange} renderToolbar={this.renderToolbar} onPreview={this.renderPreview}/>
      </React.Fragment>
    );
  }
}