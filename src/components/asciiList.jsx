import React, { Component } from 'react';
import handleApi from '../../lib/http-handle-api';
import AsciiItem from './asciiItem';

export default class AsciiList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			asciiItems: null
		};
		this.renderItems = this.renderItems.bind(this)
	}
	componentWillMount() {
		const API = {url: 'http://localhost:8000/api/?'}
		const ascii = this;
		let items = [];
		fetch(API.url)
			.then(function(response) {
				response.writeHead = (statusCode, contentType) => response;
				handleApi(API, response);
				response.write = (result) => items.push(JSON.parse(result))
				response.end = () => ascii.setState({asciiItems : items});
			  return response.blob();
			})
	}
	renderItems(){
		return (this.state.asciiItems.map((item) => <AsciiItem item={item} key={'item-' + item.id} > </AsciiItem>) )
	}

	render(){
		return (<div>{this.state.asciiItems !== null ? this.renderItems() : <img src='http://www.owlhatworld.com/wp-content/uploads/2015/12/50.gif'/>}</div>);
	}
}
