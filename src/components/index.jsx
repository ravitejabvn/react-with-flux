import React, { Component } from 'react';
import logo from './../logo.svg';
import './../App.css';
import PeopleServices from './../services/PeopleServices.js';
import {router, BrowserRouter} from 'react-router-dom';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username:'',
      password:'',
      dob:''
    };
  }

  componentDidMount() {
    
  }

  findUser = () => {
    var userName = document.getElementById("userName").value;
    var _self = this;
    PeopleServices.findPeople(userName).done(function(res){
      console.log(res.results[0].birth_year);
      let dob = res.results[0].birth_year;
      _self.setState({dob:dob});
    });
    
  }

  login = (e) => {
    var userName = document.getElementById("userName").value;
    var password = document.getElementById("password").value;
    
    // console.log(userName,password);
    if(this.state.dob.toLowerCase() == password){
      this.setState({username:userName,password:password});
      console.log("successfully logged in");
      this.props.history.replace('/search');
    }
    else{
      alert("Invalid UserName / Password")
    }
  }
  
  render() {
    return (
      <div className="App">
        {!this.state.username && !this.state.password ?
          <div>
            <label>
              <p>Allow the user to login as a character from STAR WARS using the character name as the username and birth year as the password.</p>
              Username: Luke Skywalker<br/>
              Password : 19BBY
            </label>
            <div>
              <input type="text" placeholder="user name (eg:C-3PO)" id="userName" onBlur={this.findUser}/>
              <input type="text" placeholder="password (eg:112BBY)" id="password"/>
              <input type="button" value="Login" id="btnLogin" className="btn" onClick={this.login}/>
            </div>
          </div>
          :
          ''
        }
      </div>
    );
  }
}


