import BaseStore from './BaseStore';

class SearchPlanetStore extends BaseStore {

	constructor() {
	    super();
	    this.subscribe(() => this._registerToActions.bind(this))
	    this._planets = null;
	    this._searchPlanets = null;
  	}

  	_registerToActions(action) {
	    switch(action.actionType) {
	        case 'SEARCH_PLANETS':
	        	this._searchPlanets = action.data;
	        	// console.log(this._planets);
	        	this.emitChange();
	        	break;
	      	default:
	        	break;
    	};
  	}

  	get searchPlanets(){
  		return this._searchPlanets;
  	}
}

export default new SearchPlanetStore();