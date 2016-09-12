import React, { Component } from 'react';
import * as Utils from '../utils/'
import quote from 'prog-quote';
export default class Ad extends Component {

	constructor(props) {
		super(props);
		this.state = {
			adText: {
				author:'',
				quote: ''
			}
		};
	}
	componentWillMount() {
		let newQuote = quote().next().value;
		this.setState({adText: newQuote});
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
					<div className='ad-text'>
						<h1>Random Quotes</h1>
						<div className='daw-row'>
							<quote>{this.state.adText.quote}</quote>
							<p className='pull-right'>{'–' + this.state.adText.author}</p>
						</div>

							<img src='../images/RI_logo.png' className='pull-right ad-logo' />

					</div>
				</div>

			</div>
		)
	}

}
