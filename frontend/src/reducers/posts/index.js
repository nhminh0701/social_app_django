import postReducer from './posts';
import commentReducer from './comments';
import replyReducer from './replies';


const initialState = {
    posts: null,
    isLoading: false,
    isCommentLoading: false,
    isReplyLoading: false,
}

export default function (state=initialState, action) {
    const type = action.type;
    if (type.match(/(_POST)$/)) {
        return postReducer(state, action);
    } else if (type.match(/(_COMMENT)$/)) {
        return commentReducer(state, action);
    } else if (type.match(/(_REPLY)$/)) {
        return replyReducer(state, action);
    } else {
        return state;
    }
}