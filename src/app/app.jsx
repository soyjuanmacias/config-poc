import React, {Component} from 'react';
import Lazy from './lazy';
import logo from './logo.svg';
import './app.scss';

const LFoo = Lazy(() => import( /* webpackChunkName: "modules.foo" */ './modules/foo'));

export class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get startjjkjlksked, edit <code>src/App.js</code> and save to reload.</p>
        <LFoo />
      </div>
    );
  }
}

