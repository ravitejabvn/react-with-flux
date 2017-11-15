// import request from 'reqwest';
// import $ from 'jquery';
import axios from 'axios';
import PlanetActions from './../actions/PlanetActions.js';

class PlanetServices {

	getPlanets(pageUrl){
		var url = '';
		if(pageUrl){
			url = pageUrl;
		}else{
			url = 'https://swapi.co/api/planets/';
		}
		axios({
			url:url,
      		method: 'GET'
		}).then(function(res){
			// console.log(res.data);
			PlanetActions.onPlanets(res.data);
		})
	}

	searchPlanets(value){
		var url = 'https://swapi.co/api/planets/?search='+value;
		axios({
			url:url,
      		method: 'GET'
		}).then(function(res){
			// console.log(res.data);
			PlanetActions.searchPlanets(res.data);
		})
	}

}

export default new PlanetServices()