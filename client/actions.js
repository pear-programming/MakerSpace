import axios from 'axios';

export const FETCH_ORGS = 'FETCH_ORGS';

export function fetchOrgs(){
  const request = axios.get('/organizations')

  return{
    type: FETCH_ORGS,
    payload: request
  }
}