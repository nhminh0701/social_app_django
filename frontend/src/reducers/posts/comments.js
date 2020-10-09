import { CRUD_TYPES } from '../../actions/types';


const KEY = 'COMMENT';

export default function (state, action) {
    switch (action.type) {
        case CRUD_TYPES.POST.POSTING + KEY:
        case CRUD_TYPES.DELETE.DELETING + KEY:
        case CRUD_TYPES.EDIT.EDITING + KEY:
            return {
                ...state,
                isCommentLoading: true,
            }
        
        case CRUD_TYPES.POST.POSTED + KEY:
            return {
                ...state,
                posts: state.posts.map(
                    post => post.id === action.payload.post ? 
                    {
                        ...post,
                        comments: [action.payload, ...post.comments]
                    } : post),
                isCommentLoading: false,
            }

        case CRUD_TYPES.EDIT.EDITED + KEY:
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
                isCommentLoading: false,
            }

        case CRUD_TYPES.DELETE.DELETED + KEY:
            return {
                ...state,
                posts: state.posts.map(
                    post => post.id === action.payload.postID ? 
                    {
                        ...post,
                        comments: post.comments.filter(
                            comment => comment.id !== action.payload.commentID)
                    } : post),
                isCommentLoading: false,
            }

        default:
            return state;
    }
}