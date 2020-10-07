import {  
    GETTING_POSTS,
    GET_POSTS,
    GET_POSTS_FAILED,
    POSTING_COMMENT,
    POSTED_COMMENT,
    POST_COMMENT_FAILED,
} from '../actions/types';


const initialState = {
    posts: null,
    isLoading: false
}

export default function (state=initialState, action) {
    switch (action.type) {
        case POSTING_COMMENT:
        case GETTING_POSTS:
            return {
                ...state,
                isLoading: true,
            }
        case GET_POSTS:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
            }
        case POSTED_COMMENT:
            const post_id = action.payload.comment.post;
            const updatedPost = state.posts.map(
                post => post.id === parseInt(post_id) ? 
                {
                    ...post,
                    comments: [action.payload.comment, ...post.comments]
                } : post) 
            return {
                ...state,
                posts: updatedPost,
                isLoading: true,
            }
        default:
            return state;
    }
}