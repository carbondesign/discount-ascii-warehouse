import React, { Component } from 'react';

export default class AsciiItem extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}
	componentWillMount() {

	}
	renderDate(date){
		const oneDay = 24*60*60*1000;
		const todaysDate = new Date();
		let itemDate = new Date(date);
		let dateDif = Math.round(Math.abs((itemDate.getTime() - todaysDate.getTime())/(oneDay)));
		console.log(dateDif)
		return dateDif < 6 ? ('Added ' + dateDif + ' days ago') : ('Added ' + itemDate.toDateString());
	}

	render(){
		return (
			<div className='daw-asciiItem p_All-3x'>
				<span className='daw-face' style={{fontSize: + this.props.item.size + 'px'}}>{this.props.item.face}</span>
				<p>Font Size: {this.props.item.size}</p>
				<p>Price: {'$' + (this.props.item.price/100).toFixed(2)}</p>
				<p> {this.renderDate(this.props.item.date)}</p>
			</div>
		)
	}
}

