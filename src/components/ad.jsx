import React, { Component } from 'react';

export default class Ad extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
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
				<div className='daw-ad'>{this.renderImage()}</div>
			</div>
		)
	}

}
