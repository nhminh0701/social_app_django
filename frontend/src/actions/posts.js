import {  
    GETTING_POSTS,
    GET_POSTS,
    GET_POSTS_FAILED,
    POSTING_POST,
    POSTED_POST,
    POST_POST_FAILED,
    EDITING_POST,
    EDITED_POST,
    EDIT_POST_FAILED,
    DELETING_POST,
    DELETED_POST,
    DELETE_POST_FAILED
} from './types';
import { configHeader } from './auth';


export const getPosts = () => dispatch => {
    dispatch({ type: GETTING_POSTS });
    fetch('/api/posts')
    .then(res => {
        if (res.status < 400) {
            res.json()
            .then(data => dispatch({
                type: GET_POSTS,
                payload: {
                    posts: data
                }
            }))
        } else {
            console.log(res);
        }
    })
    .catch(err => console.log(err));
}


export const postPost = content => (dispatch, getState) => {
    const config = configHeader(getState, 'POST');
    config.body = JSON.stringify({content})

    dispatch({ type: POSTING_POST });
    fetch('/api/posts/', config)
    .then(res => {
        if (res.status < 400) {
            res.json()
            .then(data => {
                dispatch({
                    type: POSTED_POST,
                    payload: data,
                })
            })
        } else {
            dispatch({ type: POST_POST_FAILED })
        }
    })
    .catch(err => console.log(err));
}


export const editPost = (content, postID) => (dispatch, getState) => {
    const config = configHeader(getState, 'PUT');
    config['body'] = JSON.stringify({ content });
    dispatch({
        type: EDITING_POST,
    })
    fetch(`/api/posts/${postID}/`, config)
    .then(res => {
        if (res.status < 400) {
            res.json()
            .then(data => dispatch({
                type: EDITED_POST,
                payload: data,
            }))
        } else {
            dispatch({ type: EDIT_POST_FAILED })
        }
    })
    .catch(err => console.log(err));
}


export const deletePost = postID => (dispatch, getState) => {
    const config = configHeader(getState, 'DELETE');
    dispatch({
        type: DELETING_POST,
    })
    fetch(`/api/posts/${postID}/`, config)
    .then(res => {
        if (res.status < 400) {
            dispatch({
                type: DELETED_POST,
                payload: postID,
            })
        } else {
            dispatch({ type: EDIT_POST_FAILED })
        }
    })
    .catch(err => console.log(err));
}