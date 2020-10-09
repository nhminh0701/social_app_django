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
    DELETE_POST_FAILED,
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
        case GETTING_POSTS:
        case POSTING_POST:
        case DELETING_POST:
        case EDITING_POST:
        case POSTING_COMMENT:
        case DELETING_COMMENT:
        case EDITING_COMMENT:
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

        case POSTED_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
                isLoading: false,
            }

        case EDITED_POST:
            return {
                ...state,
                posts: state.posts.map(
                    post => post.id === action.payload.id ?
                    action.payload : post),
                isLoading: false,
            }

        case DELETED_POST:
            return {
                ...state,
                posts: state.posts.filter(
                    post => post.id !== action.payload),
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