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
			<div className='daw-asciiItem p_All-3x'>
				<span className='daw-face' style={{fontSize: + this.props.item.size + 'px'}}>{this.props.item.face}</span>
				<p>Font Size: {this.props.item.size}</p>
				<p>Price: {'$' + (this.props.item.price/100).toFixed(2)}</p>
			</div>
		)
	}
}

