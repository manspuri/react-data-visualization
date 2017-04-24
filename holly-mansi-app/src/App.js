import React, { Component } from 'react';
import logo from './images/snl_logo.jpg';
import './App.css';
const _ = require('lodash');

const Papa = require('babyparse');
const actor_file = require('./data/snl_actor.csv');
const actor_title_file = require('./data/snl_actor_title.csv');
const rating_file = require('./data/snl_rating.csv');


class App extends Component {
  constructor() {
    super();
    this.state = {
      actor_one_avg: null,
      actor_two_avg: null,
      selected_actor_one: 'Kris Kristofferson',
      selected_actor_two: 'Kris Kristofferson',
      actors: this.loadActors(),
      actor_titles: this.loadActorTitles(),
      ratings: this.loadRatings()
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

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
          sid: row.data[0][0],
          eid: row.data[0][1],
          aid: row.data[0][3]
        };
        actor_titles.push(obj);
      }
    });

    return actor_titles;
  }

  loadRatings() {
    let ratings_data = this.readTextFile(rating_file);
    let ratings = [];

    Papa.parse(ratings_data, {
      step: function(row) {
        var obj = {
          eid: row.data[0][1],
          sid: row.data[0][0],
          rating: row.data[0][49]
        };
        ratings.push(obj);
      }
    });

    return ratings;
  }

  handleChange(event) {
    this.setState({selected_actor_one: event.target.value});
  }

  handleChange2(event) {
    this.setState({selected_actor_two: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    var actor_titles = this.state.actor_titles;
    var selected_actor_one = this.state.selected_actor_one;

    // Get seasons and episodes that the actor has been in
    // Get ratings for those episodes
    // Average the ratings

    this.calculateIndividualAverageRating(selected_actor_one);
  }

  calculateIndividualAverageRating(actorId) {
    var actor_titles = this.state.actor_titles;
    var ratings = this.state.ratings;
    var selected_actor_one = this.state.selected_actor_one;
    // get episode ids for actor
    var actor_rating_totals = [];
    let episodeIds = _.filter(actor_titles, function(actor_title) {
      return actor_title.aid === selected_actor_one
     });

    var ratingsData = [];

    episodeIds.map(function(e){
      actorData[e.aid] = [];
    })

    episodeIds.map(function(e){
      ratingsData[e.aid] = _.filter(ratings, function(rating) { return rating.eid === e.eid && rating.sid === e.sid })
    })

    console.log(ratingsData);
    // let ratingResults = _.filter(ratings, function(rating) { return rating.eid === "13" })
    // console.log(ratingResults);
    // episodeCount = episodeIds.length;

    // var total = 0
    // for ( var i = 0, _len = episodeIds.length; i < _len; i++ ) {
    //     total += Math.floor(episodeIds[i].eid);
    // }

    // if (episodeCount === 0) {
    //   average = 0;
    // } else {
    //   average = total / episodeCount;
    // }

    // return average;
  }

// create form
// 2 select boxes (actor1 actor1)
// select boxes need to map over actor data to render the actor name and aid as the value
// react form action on submit (onChange event to trigger function)
// function 
// use lodash to filter (filter actor_titles to get episode ids, get all the ratings (reduce and average ratings))
// 2 divs to show the score (hidden until the actor average score is calculated) -- conditionally viewablew
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>SNL Rumble</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Pick your two SNL Actors:
          </label>
          <select id="select_1" value={this.state.selected_actor_one} onChange={this.handleChange}>
            {this.state.actors.map(function(a){
              let key = Object.keys(a);
              return <option value={Object.keys(a)[0]}>{a[key]}</option>
            })}
          </select>
          <select id="select_2" value={this.state.selected_actor_two} onChange={this.handleChange2}>
            {this.state.actors.map(function(a){
              let key = Object.keys(a);
              return <option value={Object.keys(a)[0]}>{a[key]}</option>
            })}
          </select>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
