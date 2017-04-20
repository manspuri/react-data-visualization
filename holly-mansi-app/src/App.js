import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import file from './data/snl_actor.csv';

let file = require('./data/snl_actor.csv');

console.log('file', file);

const readTextFile = (file) => {
    let allText;
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = () => {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status === 0){
                 allText = rawFile.responseText;
                // console.log(allText);
            }
        }
    }
    rawFile.send(null);

    return allText;
}

let blob = readTextFile(file);

console.log('blob', blob);

class App extends Component {
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
      </div>
    );
  }
}

export default App;
