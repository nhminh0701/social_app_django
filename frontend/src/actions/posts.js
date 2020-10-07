import {  
    GETTING_POSTS,
    GET_POSTS,
    GET_POSTS_FAILED,
} from '../actions/types';


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