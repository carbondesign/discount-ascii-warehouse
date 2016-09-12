import React, { Component } from 'react';

export default class AsciiItem extends Component {

	constructor(props) {
		super(props);
		this.state = {
		};
	}
	componentWillMount() {

	}
	addItem(){
		console.log('click')
	}
	renderDate(date){
		const oneDay = 24*60*60*1000;
		const todaysDate = new Date();
		let itemDate = new Date(date);
		let dateDif = Math.round(Math.abs((itemDate.getTime() - todaysDate.getTime())/(oneDay)));
		return dateDif < 6 ? ('Added ' + dateDif + ' days ago') : ('Added ' + itemDate.toDateString());
	}

	render(){
		return (
			<div className={'daw-asciiItem p_All-3x m_V-2x ' + this.props.className } >
				<span className='daw-face' style={{fontSize: + this.props.item.size + 'px'}}>{this.props.item.face}</span>
				<p className='m_V-0'>Font Size: {this.props.item.size}</p>
				<p className='m_V-0'>Price: {'$' + (this.props.item.price/100).toFixed(2)}</p>
				<p className='m_V-0'> {this.renderDate(this.props.item.date)}</p>
				<button className='daw-button' onClick={this.addItem}>Add to cart</button>
			</div>
		)
	}
}

