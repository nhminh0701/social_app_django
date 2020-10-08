import {
    POSTED_COMMENT,
    POSTING_COMMENT,
    POST_COMMENT_FAILED,
    DELETING_COMMENT,
    DELETED_COMMENT,
    DELETE_COMMENT_FAILED,
    EDITING_COMMENT,
    EDITED_COMMENT,
    EDIT_COMMENT_FAILED
} from './types';
import { configHeader } from './auth';


export const postComment = (post, content) => (dispatch, getState) => {
    const config = configHeader(getState, 'POST');
    config.body = JSON.stringify({
        post, content,
    })
    
    dispatch({
        type: POSTING_COMMENT
    })
    fetch(`/api/comments/`, config)
    .then(res => {
        if (res.status < 400) {
            res.json()
            .then(data => {
                dispatch({
                    type: POSTED_COMMENT,
                    payload: data
                })
            })
        } else {
            dispatch({
                type: POST_COMMENT_FAILED
            })
            console.log(res);
        }
    })
    .catch(err => console.log(err));
}


export const deleteComment = (commentID, postID) => (dispatch, getState) => {
    const config = configHeader(getState, 'DELETE');

    dispatch({ type: DELETING_COMMENT })
    fetch(`/api/comments/${commentID}/`, config)
    .then(res => {
        if (res.status < 400) {
            dispatch({
                type: DELETED_COMMENT,
                payload: {
                    commentID, postID,
                },
            })
        } else {
            dispatch({
                type: DELETE_COMMENT_FAILED,
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

    dispatch({ type: EDITING_COMMENT })
    fetch(`/api/comments/${commentID}/`, config)
    .then(res => {
        if (res.status < 400) {
            res.json()
            .then(data => {
                dispatch({
                    type: EDITED_COMMENT,
                    payload: data,
                })
            })
        } else {
            dispatch({
                type: DELETE_COMMENT_FAILED,
                payload: commentID
            })
            console.log(res);
        }
    })
    .catch(err => console.log(err))
}
