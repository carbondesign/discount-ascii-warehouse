import React, { Component } from 'react';
import handleApi from '../../lib/http-handle-api';
import AsciiItem from './asciiItem';
import Ad from './ad';

export default class AsciiList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			asciiItems: [],
			isLoading:true,
			loadNext: this.props.loadNext
		};
		this.renderItem = this.renderItem.bind(this);
	}
	componentWillMount() {
		this.fetchAscii()
	}
	fetchAscii(){
		const API = {url: ('http://localhost:8000/api/?skip=' + this.props.offset)}
		const ascii = this;
		let items = this.state.asciiItems;
		fetch(API.url)
			.then(function(response) {
				response.writeHead = (statusCode, contentType) => response;
				handleApi(API, response);
				response.write = (result) => items.push(JSON.parse(result))
				response.end = () => ascii.setState({ asciiItems : items, isLoading : false });
			  return response.blob();
			});
	}

	renderItem(){
		return (this.state.asciiItems.map(
			(item, i) => <AsciiItem item={item} key={'item-' + item.id} className={(i==4)?'m_R-0': ''}> </AsciiItem>
		))
	}

	render(){
		return (
			<div className={'increment ' + this.props.className}>
				<Ad></Ad>
				{ this.state.isLoading ? <img src='http://www.owlhatworld.com/wp-content/uploads/2015/12/50.gif'/> : this.renderItem() }
			</div>

		);
	}
}
