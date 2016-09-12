import React from 'react';
import ReactDOM from 'react-dom';
import AsciiList from './components/asciiList';
import Ad from './components/ad';
import Nav from './components/nav';

ReactDOM.render(
	<section>
		<div className='daw-container'>
			<p className='daw-ad-intro'>But first, a word from our sponsors:</p>
			<Ad />
		</div>

		<AsciiList  className =' fadeIn animated '> </AsciiList>
	</section>
	, document.getElementById('asciiApp')
)
ReactDOM.render(
	<Nav/>

	, document.getElementById('daw-nav')
)

