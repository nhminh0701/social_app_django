import {  
    GETTING_POSTS,
    GET_POSTS,
    GET_POSTS_FAILED,
    POSTING_COMMENT,
    POSTED_COMMENT,
    POST_COMMENT_FAILED,
    DELETING_COMMENT,
    DELETED_COMMENT,
    DELETE_COMMENT_FAILED,
    EDITING_COMMENT,
    EDITED_COMMENT,
    EDIT_COMMENT_FAILED,
} from '../actions/types';


const initialState = {
    posts: null,
    isLoading: false
}

export default function (state=initialState, action) {
    switch (action.type) {
        case POSTING_COMMENT:
        case DELETING_COMMENT:
        case EDITING_COMMENT:
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
            return {
                ...state,
                posts: state.posts.map(
                    post => post.id === action.payload.post ? 
                    {
                        ...post,
                        comments: [action.payload, ...post.comments]
                    } : post),
                isLoading: false,
            }

        case EDITED_COMMENT:
            return {
                ...state,
                posts: state.posts.map(
                    post => post.id === action.payload.post ? 
                    {
                        ...post,
                        comments: post.comments.map(
                            comment => comment.id === action.payload.id ?
                            action.payload : comment)
                    } : post),
                isLoading: false,
            }

        case DELETED_COMMENT:
            return {
                ...state,
                posts: state.posts.map(
                    post => post.id === action.payload.postID ? 
                    {
                        ...post,
                        comments: post.comments.filter(
                            comment => comment.id !== action.payload.commentID)
                    } : post),
                isLoading: false,
            }

        default:
            return state;
    }
}