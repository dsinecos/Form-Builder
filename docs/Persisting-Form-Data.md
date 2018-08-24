# Persist form data in local storage

**Libraries used**
  - `redux-persist@4.x`
*I have used `redux-persist` version 4.x and not 5.x because I plan to add `redux-offline` to the application which integrates smoothly with `redux-persist` version 4.x by default.*

## Persist form data in local storage 

Create a file `index.js` in `/src/store`

The following code is the boilerplate to setup `redux-persist`. It uses the `AsyncStorage` provided by react-native to persist data. 

```javascript
    import { createStore, compose, applyMiddleware } from 'redux';
    import reducers from '../reducers';

    import { AsyncStorage } from 'react-native';
    import reduxLogger from 'redux-logger';

    // Setup with redux-persist ~ 4
    import { persistStore, autoRehydrate } from 'redux-persist';

    const reduxStore = createStore(reducers, {}, compose(applyMiddleware(reduxLogger), autoRehydrate()));

    persistStore(reduxStore, { storage: AsyncStorage, whitelist: ['form', 'formTemplates'] });

    export default { reduxStore }
```

## Delay rendering of form until form data is loaded from local storage

When the application starts, the redux store is rehydrated using data in the asyncstorage. This is an asynchronous operation. To delay the rendering of the application until the redux store has been rehydrated, a separate component `Initialize` has been created. 

This component before it mounts, uses the `persistStore` to connect redux store to AsyncStorage. In the following line 

```javascript
    persistStore(reduxStore, { storage: AsyncStorage, whitelist: ['form', 'formTemplates'] }, () => {
        this.setState({ isRehydrated: true });
    });
```
A callback is provided which is called when the 'REHYDRATE` action completes. We use the callback to set the state which in turn renders the application.

The following component is declared and exported from `/src/store/index.js`

```javascript
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
```

To delay the rendering of the application until the redux store is rehydrated, App.js is updated to the following code

```javascript
import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';

import Initialize from './src/store';
import FormScreen from './src/components/FormScreen';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }

    return (
      <Initialize>
        <Container>
          {this.renderHeader()}
          <Content padder>
            {/* <EditForm /> */}
            <FormScreen />
          </Content>
        </Container>
      </Initialize>
    );
  }
}
```