import React,{Component, PropTypes} from 'react';
import {MDCTextfield, MDCTextfieldFoundation} from '@material/textfield'; 
export default class CreatePost extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div> 
            <MDCTextfield />
               
          </div>  
        )
    }
}