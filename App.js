import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import reducers from './src/reducers';
// import { persistor, store } from './src/store';
// import { PersistGate } from 'redux-persist/lib/integration/react';

import reduxStore from './src/store';

import devToolsEnhancer from 'remote-redux-devtools';

import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Picker,
  Icon,
  Left,
  Right,
  Button,
  Body,
  Title,
  Input,
  Label,
  Textarea,
  Text,
  ListItem,
  Switch,
  CheckBox,
  Radio,
  List,
  Segment,
  Spinner,
  DatePicker
} from 'native-base';

import { getStatusBarHeight } from 'react-native-status-bar-height';

import EditForm from './src/components/EditForm';
import FormContainer from './src/components/FormContainer';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, checked: false, switchValue: false, selected: "key2", radioSelection: true, chosenDate: new Date() };
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  test(value) {
    console.log("For textarea");
    console.log(value);
  }

  renderHeader() {
    return (
      <Header style={styles.headerStyle} hasSegment>
        <Left>
          <Button transparent>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Segment>
            <Button first active>
              <Text>Edit</Text>
            </Button>
            <Button last>
              <Text>Preview</Text>
            </Button>
          </Segment>
        </Body>
        <Right>
          <Spinner color='white' />
        </Right>
      </Header>
    )
  }

  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }

    return (
      <Provider store={reduxStore}>
          <Container>
            {this.renderHeader()}
            <Content padder>
              {/* <EditForm /> */}
              <FormContainer />
            </Content>
          </Container>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerStyle: {
    paddingTop: getStatusBarHeight(),
    height: 54 + getStatusBarHeight(),
  },
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30
  },
  formStyle: {
    marginTop: 20,
    marginBottom: 20
  }
});
