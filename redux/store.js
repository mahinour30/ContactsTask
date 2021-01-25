import { createStore, combineReducers, applyMiddleware } from 'redux';
import contactReducer from './reducers/reducers';
import {createLogger} from 'redux-logger';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist:['contactReducer'],
}

export const rootReducer = combineReducers({
  contactReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore( persistedReducer, applyMiddleware( createLogger() ));


export default store