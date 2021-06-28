import { createStore } from 'redux';
import reducer from './reducers/reducer';

// Feed reducer into the store to handle updates to state.
const configureStore = () => createStore(reducer);

export default configureStore;