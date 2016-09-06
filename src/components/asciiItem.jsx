import React, { Component } from 'react';

export default class AsciiItem extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}
	componentWillMount() {

	}
	render(){
		return (
			<div>{this.props.item.face}</div>
		)
	}
}
