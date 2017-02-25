import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null }

  componentWillMount() {
      firebase.initializeApp({
      apiKey: 'AIzaSyBSLdXTL0P_th91A2I-d22FjtsWba9Gbfg',
      authDomain: 'auth-7045a.firebaseapp.com',
      databaseURL: 'https://auth-7045a.firebaseio.com',
      storageBucket: 'auth-7045a.appspot.com',
      messagingSenderId: '86741335998'
    });

    firebase.auth().onAuthStateChanged((user) => {
       if (user) {
         this.setState({ loggedIn: true });
       } else {
         this.setState({ loggedIn: false });
       }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
          {this.renderContent()}
      </View>
    );
  }
}

export default App;
