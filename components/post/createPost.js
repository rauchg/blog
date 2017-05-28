import React,{Component, PropTypes} from 'react';

export default class CreatePost extends Component {
    constructor(props) {
        super(props);
     this.state = {
      value: 'Create something!!'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Something spawned: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
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
    );
  }
}