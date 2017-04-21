import React, { Component } from 'react';
import logo from './images/snl_logo.jpg';
import './App.css';

const Papa = require('babyparse');
const actor_file = require('./data/snl_actor.csv');
const actor_title_file = require('./data/snl_actor_title.csv');
const rating_file = require('./data/snl_rating.csv');



// let actor1Id;

// let matchedEids = _.filter(actor_titles, (a) => {
//   return a.aid === actor1id;
// });



class App extends Component {
  constructor() {
    super();
    this.state = {
      actor_one_avg: null,
      actor_two_avg: null,
      actors: this.loadActors(),
      actor_titles: this.loadActorTitles(),
      ratings: this.loadRatings()
    }

    console.log('state', this.state);

  }


  readTextFile(file) {
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


  loadActors() {
    let actor_data = this.readTextFile(actor_file);
    let actors = [];

    Papa.parse(actor_data, {
      step: function(row) {
        var obj = {};
        obj[row.data[0][0]] = row.data[0][1];
        actors.push(obj);
      },
      complete: function() {
        // console.log("All done with snl actor title data!");
      }
    });

    return actors;
  }

  loadActorTitles() {
    let actor_titles_data = this.readTextFile(actor_title_file);
    let actor_titles = [];

    Papa.parse(actor_titles_data, {
      step: function(row) {
        var obj = {
          eid: row.data[0][1],
          aid: row.data[0][3]
        };
        actor_titles.push(obj);
      },
      complete: function() {
        // console.log("All done with snl actor title data!");
      }
    });

    return actor_titles;
  }

  loadRatings() {
    let ratings_data = this.readTextFile(rating_file);
    let ratings = [];

    Papa.parse(ratings_data, {
      step: function(row) {
        var obj = {};
        obj[row.data[0][1]] = row.data[0][49];
        ratings.push(obj);
            },
      complete: function() {
        // console.log("All done with snl actor title data!");
      }
    });

    return ratings;
  }


render() {
    return null;
      // <div className="App">
      //   <div className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h2>SNL Rumble</h2>
      //   </div>

        // <label htmlFor="actor_one">
        //   Select Actor
        // </label>

        // <select name="actor_one" value={this.state.actor_one}>
        //     {this.state.actors.map((obj) => {
        //       let key = obj.keys()[0];
        //       return (
        //           <option key={key} value={key} >
        //             {obj[key]}
        //           </option>
        //       );
        //     })}
        // </select>

        // <label
        //     htmlFor="actor_two">
        //     Select Actor
        // </label>

        // <select
        //     name="actor_two"
        //     value={this.state.actor_two}
        //     {this.state.actors.map((obj) => {
        //       let key = obj.keys()[0];
        //       return (
        //           <option key={key} value={key} >
        //             {obj[key]}
        //           </option>
        //       );
        //     })}
        // </select>

      // </div>
    // );
  }
}

export default App;
