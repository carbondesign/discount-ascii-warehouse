import React, { Component } from 'react';
import handleApi from '../../lib/http-handle-api';
import AsciiList from './asciiList';
import Ad from './ad';

export default class AsciiView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			asciiLists: [],
			skip: 0,
			i: 1,
			loadNext: false
		};
		this.renderLists = this.renderLists.bind(this);

	}
	componentWillMount() {

	}


	renderLists(){
		return (
			<AsciiList offset={this.state.skip + (10 * this.state.i)} loadNext={this.state.loadNext} className ={this.state.loadNext || this.state.i === 1 ? ' fadeIn animated ' : 'hide'}> </AsciiList>
		)
	}

	render(){
		return (
			this.renderLists()
		);
	}
}
