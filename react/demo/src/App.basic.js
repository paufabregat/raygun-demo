import React, { Component } from 'react';
import relayrLib from 'relayr-browser-sdk';
import rg4js from 'raygun4js';
import logo from './logo.svg';
import './App.css';

// init relayr object
const config = {
    id: 'some-id',
    redirectURI: 'http://localhost:3000',
    persist: true,
    ajax: {
        uri: 'api.relayr.io'
    }
};
relayrLib.init({ id: config.id, redirectURI: config.redirectURI }, { ajax: config.ajax });

class App extends Component {
  constructor(props) {
        super(props);
        this.state = {
          user: null
        };
        relayrLib.authorize()
        .then(user => {
          if(user.userInfo) {
            const userInfo = user.userInfo;
            // Raygun user has predefined fields, whatever else is ignored
            const raygunUserInfo = {
              identifier: userInfo.id,
              isAnonymous: false,
              email: userInfo.email,
              fullName: userInfo.name,
              //firstName
              // uuid
            };
            rg4js('setUser', raygunUserInfo);

            if(userInfo.token) delete userInfo.token; // !! IMPORTANT !!
            rg4js('withCustomData', { userInfo })
          }
        });
    }

  throwError = () => {
    // Unhandled
    throw new Error('oh oh we got a problem!');
    // OR
    // Handled
    try {
      throw new Error('crash it!')
    } catch(e) {
      rg4js('send', e);
    }
  };
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => this.throwError()}>
          Click me to throw an error
        </button>
      </div>
    );
  }
}

export default App;
