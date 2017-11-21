import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/index.jsx';
import Search from './components/search.jsx';
import { Route, BrowserRouter } from 'react-router-dom'

ReactDOM.render((
	<BrowserRouter>
		<div>
			<Route path='/' component={App}/>
			<Route path='/search' component={Search}/>
		</div>
	</BrowserRouter>
),document.getElementById('root'));