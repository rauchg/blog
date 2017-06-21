import axios from 'axios';
import { SUBMIT_TICKET, ERROR_RESPONSE } from './types';

// server route
const API_URL = 'http://localhost:3000/api';

export function errorHandler(error) {
  return {
    type: ERROR_RESPONSE,
    payload: error
  };
}

export function submitTicket({name, email, message}) {
  return function(dispatch) {
    axios.post(`${API_URL}/tickets/create-new-ticket`, {name, email, message}
    )
    .then(response => {
      dispatch({
        type: SUBMIT_TICKET,
        payload: response.data
      });
    })
    .catch(response => dispatch(errorHandler(response.data.error)))
  }
}