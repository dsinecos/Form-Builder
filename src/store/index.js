import { createStore, compose, applyMiddleware } from 'redux';
import reducers from '../reducers';

import { AsyncStorage } from 'react-native';
import reduxLogger from 'redux-logger';

// Setup with redux-persist ~ 4
import { persistStore, autoRehydrate } from 'redux-persist';

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

const reduxStore = createStore(reducers, {}, compose(applyMiddleware(reduxLogger), autoRehydrate()));

class Initialize extends Component {
    constructor() {
        super();
        this.state = { isRehydrated: false };
    }

    componentWillMount() {
        persistStore(reduxStore, { storage: AsyncStorage, whitelist: ['form', 'formTemplates'] }, () => {
            this.setState({ isRehydrated: true });
        });
    }

    render() {
        return this.state.isRehydrated ?
            (
                <Provider store={reduxStore}>
                    {this.props.children}
                </Provider>
            ) :
            (
                <View style={styles.container}>
                    <Text>Rehydrating</Text>
                </View>
            )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Initialize;

// Setup with redux-persist > 5.0
// import { persistStore, persistReducer } from 'redux-persist';

// const persistConfig = {
//     key: 'root',
//     storage: AsyncStorage
// }

// const persistedReducer = persistReducer(persistConfig, reducers);

// export const reduxStore = createStore(persistedReducer, applyMiddleware(reduxLogger));
// export const persistor = persistStore(reduxStore);