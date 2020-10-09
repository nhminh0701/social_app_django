import { CRUD_TYPES } from '../../actions/types';


const KEY = 'POST';

export default function (state, action) {
    switch (action.type) {
        case CRUD_TYPES.GET.GETTING + KEY:
        case CRUD_TYPES.POST.POSTING + KEY:
        case CRUD_TYPES.DELETE.DELETING + KEY:
        case CRUD_TYPES.EDIT.EDITING + KEY:
            return {
                ...state,
                isLoading: true,
            }

        case CRUD_TYPES.GET.GET + KEY:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
            }

        case CRUD_TYPES.POST.POSTED + KEY:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
                isLoading: false,
            }

        case CRUD_TYPES.EDIT.EDITED + KEY:
            return {
                ...state,
                posts: state.posts.map(
                    post => post.id === action.payload.id ?
                    action.payload : post),
                isLoading: false,
            }

        case CRUD_TYPES.DELETE.DELETED + KEY:
            return {
                ...state,
                posts: state.posts.filter(
                    post => post.id !== action.payload),
                isLoading: false,
            }

        default: 
            return state;
    }
}