import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};
const middleware = [thunk];

export default createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
)