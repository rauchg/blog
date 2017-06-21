import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const form = reduxForm({
  form: 'posts'
});

const renderField = field => (
    <div>
      <div className="input_container">
        <input className="form-control" {...field.input}/>
      </div>
      {field.touched && field.error && <div className="error">{field.error}</div>}
    </div>
);


const renderTextArea = field => (
  <div>
    <div className="input_container">
      <textarea {...field.input}/>
    </div>
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
);

class TicketForm extends Component {
  handleFormSubmit({type, message}) {
    this.props.initialize('');
    this.props.handleSubmitTicket({type, message});
  }
	
	render() {
     const { handleSubmit } = this.props;

     return (
       <div>
         <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

           <label>Name:</label>
           <Field name="name" type="text" component={renderField}/>

           <label>Email:</label>
           <Field name="email" type="email" component={renderField}/>

           <label>Create Something!:</label>
           <Field name="post" type="text" component={renderTextArea}/>

           <button action="submit" className="button">Save changes</button>
         </form>
       </div>
     )
   }
 }
 
 function mapStateToProps(state) {
   return {
     formValues: state.form
   };
 }

 export default connect(mapStateToProps, actions)(form(TicketForm));