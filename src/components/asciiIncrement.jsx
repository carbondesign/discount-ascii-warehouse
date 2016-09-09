import React, { Component } from 'react';
import handleApi from '../../lib/http-handle-api';
import AsciiList from './asciiList';
import Ad from './ad';

export default class AsciiIncrement extends Component {

	constructor(props) {
		super(props);
		this.state = {
			asciiLists: [],
			skip: 0,
			loadNext: false
		};
		this.renderLists = this.renderLists.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
	}
	componentWillMount() {

	}
	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}
	componentWillUnmount() {
	     window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll(e){
		// console.log((window.innerHeight + window.scrollY), ( document.body.offsetHeight + 1))
		if ((window.innerHeight + window.scrollY) >= ( document.body.offsetHeight )) {

		        this.setState({ loadNext : true });
		        console.log( 'bottom', this.state);
		}

	}

	renderLists(){
		return (
			<div>
				<AsciiList offset={this.state.skip} className=' fadeIn animated'> </AsciiList>
				<AsciiList offset={this.state.skip + 10} className ={this.state.loadNext ? ' fadeIn animated ' : 'hide'}> </AsciiList>
			</div>
		)
	}

	render(){
		return (
			this.renderLists()
		);
	}
}
