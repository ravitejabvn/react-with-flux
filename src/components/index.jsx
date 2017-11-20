import React, { Component } from 'react';
import logo from './../logo.svg';
import './../App.css';
import PlanetServices from './../services/PlanetServices.js';
import PlanetActions from './../actions/PlanetActions.js';
import PlanetStore from './../stores/PlanetStore.js';
import SearchPlanetStore from './../stores/SearchPlanetStore.js';

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      username:'',
      password:'',
      planets : [],
      planetUrl : '',
      searchingPlanets : [],
      temp : ''
    };
  }

  componentDidMount() {
    PlanetActions.getPlanets(this.state.planetUrl);
    PlanetStore.addChangeListener(this._onChange);
    SearchPlanetStore.addChangeListener(this._onSearchChange);
  }

  _onChange = () => {
    var planets = PlanetStore.planets;
    // console.log(planets,planets.results);
    for(var r=0; r<planets.results.length; r++){
      this.setState((state) => { planets: state.planets.push(planets.results[r])});
    }
    this.setState({planetUrl:planets.next});
  }

  _onSearchChange = () => {
    var planets = SearchPlanetStore.searchPlanets;

    planets.results.sort(function(a,b){
      if(b.population === 'unknown'){
        b.population = 0;
      }
      return a.population - b.population;
    });
    this.setState({searchingPlanets:[]});
    for(var r=0; r<planets.results.length; r++){
      this.setState((state) => { searchingPlanets: state.searchingPlanets.push(planets.results[r])});
    }
    this.setState({temp:planets.next});
  }

  loadMorePlanets = () => {
    this.state.planetUrl ? PlanetActions.getPlanets(this.state.planetUrl) : console.log('No Url');
  }

  searchPlanets = (e) => {
    // console.log(e.target.value);
    PlanetServices.searchPlanets(e.target.value);
  }

  login = (e) => {
    var userName = document.getElementById("userName").value;
    var password = document.getElementById("password").value;
    this.setState({username:userName,password:password});
    console.log(userName,password);
  }
  
  render() {
    var i = 0;
    // console.log(this.state.username,this.state.password)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Star Wars</h1>
        </header>
        {
          !this.state.username && !this.state.password ? 
            <div>
              <input type="text" placeholder="user name" id="userName"/>
              <input type="text" placeholder="password" id="password"/>
              <input type="button" value="Login" id="btnLogin" className="btn" onClick={this.login}/>
            </div>
          :
          ''
        }
        {
          this.state.username === 'Luke Skywalker' && this.state.password === '19BBY' ?
              <div className="row">
                <div className="col s12">
                  <input type="text" placeholder="search planets" onChange={this.searchPlanets}/>
                </div>
                <div className="row">
                  <div className="col s6">
                    {
                      this.state.planets.map(function(planet,key){
                        return (
                          <li key={key}><a href="javascript:void(0)">{planet.name}</a></li>
                        );
                      })
                    }
                    <input type="button" className="btn" value="Load More" onClick={this.loadMorePlanets}/>
                  </div>
                  <div className="col s6">
                    {
                      this.state.searchingPlanets && this.state.searchingPlanets.length >0 ? 
                        this.state.searchingPlanets.map(function(planet,key){
                          i++;
                          var divStyle = {
                            fontSize: 12+i+'px',
                          };
                          return (
                            <li key={key} style={divStyle}><a href="javascript:void(0)">{planet.name}</a>, {planet.population}</li>
                          );
                        })
                      :
                      ''
                    }
                  </div>
                </div>
              </div>
          :
          <h1>
            Please enter valid credentials
          </h1>
        }
        

      </div>
    );
  }
}
