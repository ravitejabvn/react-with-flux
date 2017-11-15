import AppDispatcher from './../dispatchers/AppDispatcher.js';
import Service from './../services/PlanetServices';

export default {

	getPlanets:(pageUrl)=>{
		Service.getPlanets(pageUrl);
	},

	onPlanets:(planets)=>
  	{
		AppDispatcher.dispatch({
	      	actionType: 'GET_PLANETS',
	      	data: planets
    	});
  	},

  	searchPlanets:(planets)=>
  	{
		AppDispatcher.dispatch({
	      	actionType: 'SEARCH_PLANETS',
	      	data: planets
    	});
  	}

}