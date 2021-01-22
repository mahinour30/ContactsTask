import {createStore} from 'redux';
import {Reducer} from './Reducers';

export let Store = createStore(Reducer)