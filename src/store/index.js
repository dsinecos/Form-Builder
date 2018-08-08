import { createStore, compose, applyMiddleware } from 'redux';
import reducers from '../reducers';

import { AsyncStorage } from 'react-native';
import logger from 'redux-logger';

// Setup with redux-persist ~ 4
// import { persistStore, autoRehydrate } from 'redux-persist';

// const store = createStore(reducers, {}, compose(autoRehydrate()));
// persistStore(store, { storage: AsyncStorage, whitelist: ['form', 'formTemplates'] }).purge();

// export default store;

// Setup with redux-persist > 5.0
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const reduxStore = createStore(persistedReducer, applyMiddleware(logger));
export const persistor = persistStore(reduxStore);