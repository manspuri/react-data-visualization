import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  amber400, amber900,
  cyan500, cyan700,
  pinkA200,
  grey50, grey100, grey200, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import Paper from 'material-ui/Paper';
import Card from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import './App.css';

const Papa = require('babyparse');
const actor_file = require('./data/snl_actor.csv');
const actor_title_file = require('./data/snl_actor_title.csv');
const rating_file = require('./data/snl_rating.csv');


// const muiTheme = getMuiTheme({
//   palette: {
//     primary1Color: cyan500,
//     primary2Color: cyan700,
//     primary3Color: grey400,
//     accent1Color: pinkA200,
//     accent2Color: grey100,
//     accent3Color: grey500,
//     textColor: fullBlack,
//     alternateTextColor: white,
//     canvasColor: amber400,
//     borderColor: grey50,
//     disabledColor: fade(darkBlack, 0.3),
//     pickerHeaderColor: cyan500,
//     clockCircleColor: fade(darkBlack, 0.07),
//     shadowColor: grey100,
//   }
// });


class App extends Component {
  constructor() {
    super();
    this.state = {
      actor_one_avg: null,
      actor_two_avg: null,
      actors: this.loadActors(),
      actor_titles: this.loadActorTitles(),
      ratings: this.loadRatings(),
      selected_actor_one: null,
      selected_actor_two: null
    }
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

  handleChangeActorOne(event, index, value) {
    this.setState({
      selected_actor_one: value
    })
  }

  handleChangeActorTwo(event, index, value) {
    this.setState({
      selected_actor_two: value
    })
  }

  onSubmit(e) {
    this.setState({
      actor_one_avg: "7.4",
      actor_two_avg: "9.2"
    })
  }


  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div className="App">
          <Paper style={{marginLeft: "25%", width: "50%", paddingTop: '20px', paddingRight: '10px', paddingBottom: '10px', paddingLeft: '10px'}}>
            <div className="App-header">
              <div style={{textAlign: "center"}}>
                <img src={process.env.PUBLIC_URL + 'images/snl_animation.gif'} className="appLogo" alt="logo" width="300px" />

                <h1 style={{color: `${amber400}`}}>SNL Rumble</h1>
              </div>
            </div>

            <form>
              <Paper style={{
                  height: 400,
                  width: 600,
                  marginLeft: "5%",
                  marginBottom: 30,
                  textAlign: 'center',
                  display: 'block',
                  overflow: 'hidden',
                  paddingRight: 30,
                  paddingTop: 30,
                  paddingLeft: 30
                }}
                className="form-container"
                zDepth={4} >
                <Card containerStyle={{display: 'inline-block',
                                       height: 180,
                                       width: 100,
                                       paddingRight: 20,
                                       float: 'left',
                                       position: 'relative',
                                       zIndex: "20"
                                     }}>
                  <SelectField
                    floatingLabelText="Select Actor 1"
                    value={this.state.selected_actor_one}
                    onChange={(e,i,v) => this.handleChangeActorOne(e,i,v)}
                  >
                    <MenuItem value="Adam Sandler" primaryText="Adam Sandler" />
                    <MenuItem value="Kate McKinnon" primaryText="Kate McKinnon" />
                    <MenuItem value="Leslie Jones" primaryText="Leslie Jones" />
                    <MenuItem value="Amy Poehler" primaryText="Amy Poehler" />
                    <MenuItem value="Will Farrell" primaryText="Will Farrell" />
                  </SelectField>
                  <div style={{textAlign: 'center', marginTop: 45, fontSize: 90, width: 250, color: `${amber400}`}}>
                    {this.state.actor_one_avg ? `${this.state.actor_one_avg}` : ""}
                  </div>
                </Card>
                <Card containerStyle={{display: 'inline-block',
                                       height: 180,
                                       width: 100,
                                       float: 'left',
                                       position: 'relative',
                                       marginLeft: 160,
                                       clear: 'right',
                                       zIndex: "20"}}>
                  <SelectField
                    floatingLabelText="Select Actor 2"
                    value={this.state.selected_actor_two}
                    onChange={(e,i,v) => this.handleChangeActorTwo(e,i,v)}
                  >
                    <MenuItem value="Adam Sandler" primaryText="Adam Sandler" />
                    <MenuItem value="Kate McKinnon" primaryText="Kate McKinnon" />
                    <MenuItem value="Leslie Jones" primaryText="Leslie Jones" />
                    <MenuItem value="Amy Poehler" primaryText="Amy Poehler" />
                    <MenuItem value="Will Farrell" primaryText="Will Farrell" />
                  </SelectField>
                  <div style={{textAlign: 'center', marginTop: 45, fontSize: 90, width: 250, color: `${amber400}`}}>
                    {this.state.actor_two_avg ? `${this.state.actor_two_avg}` : ""}
                  </div>
                </Card>
                <RaisedButton label="Let's RUMBLE!" style={{marginTop: 300, zIndex: "20"}} onClick={(e) => this.onSubmit(e)} />
              </Paper>
            </form>
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
