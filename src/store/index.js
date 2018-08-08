import { createStore, compose } from 'redux';
import reducers from '../reducers';

import { AsyncStorage } from 'react-native';

// Setup with redux-persist ~ 4
import { persistStore, autoRehydrate } from 'redux-persist';

const store = createStore(reducers, {}, compose(autoRehydrate()));
persistStore(store, { storage: AsyncStorage, whitelist: ['form', 'formTemplates'] });

export default store;

// Setup with redux-persist > 5.0
// import { persistStore, persistReducer } from 'redux-persist';

// const persistConfig = {
//     key: 'root',
//     storage: AsyncStorage
// }

// const persistedReducer = persistReducer(persistConfig, reducers);

// // persistStore(store, { storage: AsyncStorage, whitelist: ['form', 'formTemplates'] });

// export const store = createStore(persistedReducer);
// export const persistor = persistStore(store);