import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { createStore } from 'redux'

let file1 = require('./data/snl_actor.csv');
let file2 = require('./data/snl_actor_title.csv');
let file3 = require('./data/snl_rating.csv');

const readTextFile = (file) => {
    let allText;
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = () => {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status === 0){
                 allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);

    return allText;
}

let snl_actor_data = readTextFile(file1);
let snl_actor_title_data = readTextFile(file2);
let snl_rating_data = readTextFile(file3);

let actors = [];
let actor_titles = [];
let ratings = [];

function createActor(row) {
  var obj = {};
  obj[row[0]] = row[1];
  actors.push(obj);
}

function createActorTitle(row) {
  var obj = {};
  obj[row[3]] = row[1];
  actor_titles.push(obj);
}

function createRating(row) {
  var obj = {};
  obj[row[1]] = row[49];
  actor_titles.push(obj);
}

const Papa = require('babyparse');

function readCSV(file, type) {
  if (type === 'snl_actor_data') {
    Papa.parse(file, {
      step: function(row) {
        createActor(row.data[0]);
      }
    });
  } else if (type === 'snl_actor_title_data') {
    Papa.parse(file, {
      step: function(row) {
        createActorTitle(row.data[0]);
      }
    });
  } else if (type === 'snl_rating_data') {
    Papa.parse(file, {
      step: function(row) {
        createRating(row.data[0]);
      }
    });
  }
}

readCSV(snl_actor_data, 'snl_actor_data');
readCSV(snl_actor_title_data, 'snl_actor_title_data');
readCSV(snl_rating_data, 'snl_rating_data');

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
