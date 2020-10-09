import { CRUD_TYPES } from '../../actions/types';


const KEY = 'REPLY';

export default function (state, action) {
    switch (action.type) {
        case CRUD_TYPES.POST.POSTING + KEY:
        case CRUD_TYPES.DELETE.DELETING + KEY:
        case CRUD_TYPES.EDIT.EDITING + KEY:
            return {
                ...state,
                isReplyLoading: true,
            }
        
        case CRUD_TYPES.POST.POSTED + KEY:
            return {
                ...state,
                posts: state.posts.map(
                    post => post.id === action.payload.postID ? 
                    {
                        ...post,
                        comments: post.comments.map(
                            comment => 
                            action.payload.replyData.comment === comment.id ?
                            {
                                ...comment,
                                replies: [action.payload.replyData, ...comment.replies]
                            }
                            : comment)
                    } : post),
                isReplyLoading: false,
            }

        case CRUD_TYPES.EDIT.EDITED + KEY:
            return {
                ...state,
                posts: state.posts.map(
                    post => post.id === action.payload.postID ? 
                    {
                        ...post,
                        comments: post.comments.map(
                            comment => 
                            action.payload.replyData.comment === comment.id ?
                            {
                                ...comment,
                                replies: comment.replies.map(reply => 
                                    reply.id === action.payload.replyData.id ?
                                    action.payload.replyData: reply)
                            }
                            : comment)
                    } : post),
                isReplyLoading: false,
            }

        case CRUD_TYPES.DELETE.DELETED + KEY:
            return {
                ...state,
                posts: state.posts.map(
                    post => post.id === action.payload.postID ? 
                    {
                        ...post,
                        comments: post.comments.map(
                            comment => 
                            action.payload.replyData.comment === comment.id ?
                            {
                                ...comment,
                                replies: comment.replies.filter(reply => 
                                    reply.id !== action.payload.replyData.id)
                            }
                            : comment)
                    } : post),
                isReplyLoading: false,
            }

        default:
            return state;
    }
}