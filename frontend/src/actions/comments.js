import { CRUD_TYPES } from './types';
import { configHeader } from './auth';


const KEY = 'COMMENT';

export const postComment = (post, content) => (dispatch, getState) => {
    const config = configHeader(getState, 'POST');
    config.body = JSON.stringify({
        post, content,
    })
    
    dispatch({
        type: CRUD_TYPES.POST.POSTING + KEY
    })
    fetch(`/api/comments/`, config)
    .then(res => {
        if (res.status < 400) {
            res.json()
            .then(data => {
                dispatch({
                    type: CRUD_TYPES.POST.POSTED + KEY,
                    payload: data
                })
            })
        } else {
            dispatch({
                type: CRUD_TYPES.POST.POST_FAILED + KEY
            })
            console.log(res);
        }
    })
    .catch(err => console.log(err));
}


export const deleteComment = (commentID, postID) => (dispatch, getState) => {
    const config = configHeader(getState, 'DELETE');

    dispatch({ type: CRUD_TYPES.DELETE.DELETING + KEY })
    fetch(`/api/comments/${commentID}/`, config)
    .then(res => {
        if (res.status < 400) {
            dispatch({
                type: CRUD_TYPES.DELETE.DELETED + KEY,
                payload: {
                    commentID, postID,
                },
            })
        } else {
            dispatch({
                type: CRUD_TYPES.DELETE.DELETE_FAILED + KEY,
                payload: commentID
            })
            console.log(res);
        }
    })
    .catch(err => console.log(err))
}


export const editComment = (commentID, content) => (dispatch, getState) => {
    const config = configHeader(getState, 'PUT');
    config.body = JSON.stringify({content});

    dispatch({ type: CRUD_TYPES.EDIT.EDITING + KEY })
    fetch(`/api/comments/${commentID}/`, config)
    .then(res => {
        if (res.status < 400) {
            res.json()
            .then(data => {
                dispatch({
                    type: CRUD_TYPES.EDIT.EDITED + KEY,
                    payload: data,
                })
            })
        } else {
            dispatch({
                type: CRUD_TYPES.EDIT.EDIT_FAILED + KEY,
                payload: commentID
            })
            console.log(res);
        }
    })
    .catch(err => console.log(err))
}
