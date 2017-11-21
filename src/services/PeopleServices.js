// import request from 'reqwest';
import $ from 'jquery';
// import axios from 'axios';

class PeopleServices {

	findPeople(value){
		var url = 'https://swapi.co/api/people/?search='+value;
		return $.ajax({
	      	url: url,
	      	method: 'GET',
      		contentType: 'application/json'
	    })
	}

}

export default new PeopleServices()