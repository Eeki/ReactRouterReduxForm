import axios from 'axios';

import {
  FETCH_POSTS, 
  CREATE_POST, 
  FETCH_POST, 
  DELETE_POST,
  CREATE_HOME,
  HOME_FORM_TO_PAGE
  } from './const'


const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=eeki';


export function createHome(props) {
  console.log('createHome', props)
}

export function toHomeFormPage(pageIndex) {
  console.log(`Siirrytään sivulle ${pageIndex}`)
  
  return {
    type: HOME_FORM_TO_PAGE,
    payload: pageIndex
  }
}

export function  fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

  return {
    type: FETCH_POSTS,
    payload: request
  };

}

export function createPost(props) {
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, props);

  return {
    type: CREATE_POST,
    payload: request
  };
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return {
    type: FETCH_POST,
    payload: request
  };
}

export function deletePost(id) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return {
    type: DELETE_POST,
    payload: request
  };
}