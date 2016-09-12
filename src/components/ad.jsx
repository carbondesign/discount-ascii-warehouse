import React, { Component } from 'react';
import * as Utils from '../utils/'

export default class Ad extends Component {

	constructor(props) {
		super(props);
		this.state = {
			adText: 'As child Nikola Tesla was inspired to understand the secrets of electricity after being shocked by static electricity from his beloved cat, Macak.'
		};
	}
	componentWillMount() {
		fetch('http://www.randomtext.me/api/lorem/p-5/5-15')
			.then(Utils.status)
			.then(function (json) {
				// console.log(json);
				if (json.err) {
					console.log('Error ' + json.err);
				} else {
					console.log(json);

				  return json;

				}
			})
			.catch(function (error) {
				console.log('Error fetching data: ' + error);
			});


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
			<div className='daw-ad-row fadeIn animated m_V-2x'>
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
