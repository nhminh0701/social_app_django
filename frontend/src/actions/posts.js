import { CRUD_TYPES } from './types';
import { configHeader } from './auth';


const KEY = 'POST';

export const getPosts = () => dispatch => {
    dispatch({ type: CRUD_TYPES.GET.GETTING + KEY });
    fetch('/api/posts')
    .then(res => {
        if (res.status < 400) {
            res.json()
            .then(data => dispatch({
                type: CRUD_TYPES.GET.GET + KEY,
                payload: {
                    posts: data.map(post => {
                        // Reverse comments order in each post
                        const comments = post.comments;

                        // Reverse replies order in each comment
                        comments.map(comment => {
                            const replies = comment.replies;
                            replies.reverse();
                            return {
                                ...comment,
                                replies,
                            }
                        })
                        comments.reverse();
                        return {
                            ...post,
                            comments,
                        }
                    })
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

    dispatch({ type: CRUD_TYPES.POST.POSTING + KEY });
    fetch('/api/posts/', config)
    .then(res => {
        if (res.status < 400) {
            res.json()
            .then(data => {
                dispatch({
                    type: CRUD_TYPES.POST.POSTED + KEY,
                    payload: data,
                })
            })
        } else {
            dispatch({ type: CRUD_TYPES.POST.POST_FAILED + KEY })
        }
    })
    .catch(err => console.log(err));
}


export const editPost = (content, postID) => (dispatch, getState) => {
    const config = configHeader(getState, 'PUT');
    config['body'] = JSON.stringify({ content });
    dispatch({
        type: CRUD_TYPES.EDIT.EDITING + KEY,
    })
    fetch(`/api/posts/${postID}/`, config)
    .then(res => {
        if (res.status < 400) {
            res.json()
            .then(data => dispatch({
                type: CRUD_TYPES.EDIT.EDITED + KEY,
                payload: data,
            }))
        } else {
            dispatch({ type: CRUD_TYPES.EDIT.EDIT_FAILED + KEY })
        }
    })
    .catch(err => console.log(err));
}


export const deletePost = postID => (dispatch, getState) => {
    const config = configHeader(getState, 'DELETE');
    dispatch({
        type: CRUD_TYPES.DELETE.DELETING + KEY,
    })
    fetch(`/api/posts/${postID}/`, config)
    .then(res => {
        if (res.status < 400) {
            dispatch({
                type: CRUD_TYPES.DELETE.DELETED + KEY,
                payload: postID,
            })
        } else {
            dispatch({ type: CRUD_TYPES.DELETE.DELETE_FAILED + KEY })
        }
    })
    .catch(err => console.log(err));
}