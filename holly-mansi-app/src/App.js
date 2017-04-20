import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const imdb = require('imdb-api');


// function getActorTitle(data) {
//   let actorTitleArry = [];
//   data.join('\n');
//   data.map((r) => {
//     let actor = {
//       eid: data[1],
//       aid: data[4]
//     }
//     actorTitleArry.push(actor);
//   })
//
//   return actorTitleArry;
// }
//
// setState{
//   actors: getActorTitle(data)
// }


imdb.getById("tt0072562").then(things => {
    console.log('show', things);
});


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
