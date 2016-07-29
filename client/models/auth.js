import axios from 'axios';

export function signup(user){
  const request = axios.post('/signup', user)

  return request

}

export function login(user){
  const request = axios.post('/login', user)

  return request
  
}