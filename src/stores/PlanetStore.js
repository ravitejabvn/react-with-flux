import BaseStore from './BaseStore';

class PlanetStore extends BaseStore {

	constructor() {
	    super();
	    this.subscribe(() => this._registerToActions.bind(this))
	    this._planets = null;
  	}

  	_registerToActions(action) {
	    switch(action.actionType) {
	      	case 'GET_PLANETS':
	        	this._planets = action.data;
	        	// console.log(this._planets);
	        	this.emitChange();
	        	break;
	      	default:
	        	break;
    	};
  	}

  	get planets(){
  		return this._planets;
  	}
}

export default new PlanetStore();