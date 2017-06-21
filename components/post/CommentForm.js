import React, { Component } from 'react';
// import style from './style';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { author: '', text: '' };
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }
  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    let author = this.state.author.trim();
    let text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({ author: author, text: text });
    this.setState({ author: '', text: '' });
  }
  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          type='text'
          placeholder='Your name...'
          
          value={ this.state.author }
          onChange={ this.handleAuthorChange } />
        <input
          type='text'
          placeholder='Say something...'
                   value={ this.state.text }
          onChange={ this.handleTextChange } />
        <input
          type='submit'
          
          value='Post'/>
        <style jsx>{`
      textarea {
        width: 100%;
        height: 15em;
        margin: 0 auto;
      }

   input {
        width: 100%;
        color: #22bad9;
        cursor: pointer;
      }

      label {
        color: #FF001F;
      }
        @media (max-width: 500px) {
        textarea {
         height: 45em;
        }
      }
    `}</style>
      </form>
    )
  }
}

export default CommentForm;