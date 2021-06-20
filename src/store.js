import { createStore, combineReducers } from 'redux';
import reducer from './reducers/reducer';

// TODO: Split reducers and combine
// This is used to combine multiple reducers
// const rootReducer = combineReducers({
// })

const configureStore = () => createStore(reducer);

export default configureStore;