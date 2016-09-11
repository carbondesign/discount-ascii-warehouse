import React, { Component } from 'react';

export default class Ad extends Component {

	constructor(props) {
		super(props);
		this.state = {
			adText: 'As child Nikola Tesla was inspired to understand the secrets of electricity after being shocked by static electricity from his beloved cat, Macak.'
		};
	}
	componentWillMount() {
		// fetch('http://catfacts-api.appspot.com/api/facts', {mode: 'no-cors'})
		// 	.then(function(response) {
		// 		console.log(response)
		// 		this.setState({adText: response.facts})

		// 	});

	}
	renderImage(){
		return (
			<div className="ad-image">
				<img src={'/ad/?r=' + Math.floor(Math.random()*1000)}/>
			</div>
		)
	}
	render(){
		return (
			<div className='daw-row fadeIn animated'>
				<div className='daw-ad'>
					{this.renderImage()}
					<div className='daw-ad-text'>
						<p>{this.state.adText}</p>
					</div>
				</div>

			</div>
		)
	}

}
