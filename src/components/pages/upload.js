import React, { Component } from 'react'; 
import Marked from 'marked';
import Markmirror from 'react-markmirror';
import { Button, FormControl} from 'react-bootstrap';
import { connect } from 'react-redux';
import apiURL from '../../api';

class Upload extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      content: '', 
      title: '',
      cover: '',
      saved: false
    };
  }

  save = (e) => {
    e.preventDefault();
    let error = false;
    fetch(`${apiURL}/api/story`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        author: this.props.author.username,
        title: this.state.title,
        content: this.state.content,
        cover: this.state.cover
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

  handleCoverChange = (e) => {
    this.setState({cover: e.target.value});
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
        <form id="story" style={{display: 'flex', justifyContent: 'space-evenly', margin: '0.5em'}}>
          <FormControl
            placeholder="Title"
            value={this.state.title}
            onChange={e => this.handleTitleChange(e)}
            style={{maxWidth: '20em'}}
          />
          <FormControl
            placeholder="(Optional) Link to cover image"
            value={this.state.cover}
            onChange={e => this.handleCoverChange(e)}
            style={{maxWidth: '20em'}}
          />
          <Button
            type="button"
            variant={((this.state.length === 0 || this.state.content.length === 0 ) || this.state.saved)
              ? 'dark': 'primary'
            }
            onClick={(e) => this.save(e)}
            disabled={(this.state.length === 0 || this.state.content.length === 0 ) || this.state.saved}
          >
            {this.state.saved ? <b>Saved</b> : <b>Create Story</b>}
          </Button>
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