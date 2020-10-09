import { CRUD_TYPES } from './types';
import { configHeader } from './auth';


const KEY = 'REPLY';

export const postReply = (postID, comment, content) => 
(dispatch, getState) => {
    const config = configHeader(getState, 'POST');
    config.body = JSON.stringify({
        content, comment,
    })
    
    dispatch({
        type: CRUD_TYPES.POST.POSTING + KEY
    })
    fetch(`/api/replies/`, config)
    .then(res => {
        if (res.status < 400) {
            res.json()
            .then(replyData => {
                dispatch({
                    type: CRUD_TYPES.POST.POSTED + KEY,
                    payload: { replyData, postID }
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


export const deleteReply = (replyData, postID) => (dispatch, getState) => {
    const config = configHeader(getState, 'DELETE');

    dispatch({ type: CRUD_TYPES.DELETE.DELETING + KEY })
    fetch(`/api/replies/${replyData.id}/`, config)
    .then(res => {
        if (res.status < 400) {
            dispatch({
                type: CRUD_TYPES.DELETE.DELETED + KEY,
                payload: {
                    replyData, postID,
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


export const editReply = (reply, content, postID) => (dispatch, getState) => {
    const config = configHeader(getState, 'PUT');
    config.body = JSON.stringify({
        content, comment: reply.comment});

    dispatch({ type: CRUD_TYPES.EDIT.EDITING + KEY })
    fetch(`/api/replies/${reply.id}/`, config)
    .then(res => {
        if (res.status < 400) {
            res.json()
            .then(replyData => {
                dispatch({
                    type: CRUD_TYPES.EDIT.EDITED + KEY,
                    payload: { postID, replyData },
                })
            })
        } else {
            dispatch({
                type: CRUD_TYPES.EDIT.EDIT_FAILED + KEY,
            })
            console.log(res);
        }
    })
    .catch(err => console.log(err))
}
