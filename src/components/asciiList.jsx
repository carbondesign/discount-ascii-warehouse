import React, { Component } from 'react';
import handleApi from '../../lib/http-handle-api';
import AsciiItem from './asciiItem';
import Ad from './ad';

export default class AsciiList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			asciiElements: [],
			isLoading:true,
			setIncrement: 0
		};
		// this.renderItems = this.renderItems.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.fetchAscii = this.fetchAscii.bind(this);
	}

	fetchAscii(offset){

		this.setState({isLoading : true })
		const API = {url: ('http://localhost:8000/api?skip=' + offset)}
		const ascii = this;
		// i = this.state.setIncrement,
		self = this;
		fetch(API.url)
			.then(function(response) {

				let newJSON = [];
				response.writeHead = (statusCode, contentType) => {return response;}
				handleApi(API, response);

				response.write = (result) => { newJSON.push(JSON.parse(result))}
				response.end = () => {

					let newSet = self.buildElements(newJSON);
					console.log('fetching',self.state.asciiElements,newSet);
					let newItems = self.state.asciiElements.push(newSet)
					ascii.setState({
						asciiItems : newItems,
						isLoading : false
					});
					// self.setState({setIncrement : (i + 1)});
					window.addEventListener('scroll', self.handleScroll);
				};
			  return response;
			});
	}

	// buildSet(start, end){
	// 	return (
	// 		<div className={'increment ' + this.props.className}>
	// 			<Ad key={'ad-' + this.state.setIncrement}></Ad>
	// 			{ this.state.isLoading ? this.loadingImage() : null}
	// 			{ this.renderItems() }
	// 		</div>
	// 	)
	// }
	loadingImage(i){
		if (this.state.isLoading) {
			return (<div className='daw-row'>
				<div className='loadingGIF'>
					<img key={'catad-' + i}  src='http://www.owlhatworld.com/wp-content/uploads/2015/12/50.gif'/>
				</div>
			</div>)
		}
	}
	buildElements(items){
		var asciiElements = [];
		for (var i = 0; i < items.length; i++) {
			asciiElements.push(<AsciiItem item={items[i]} key={'item-' + items[i].id} > </AsciiItem>)
		}
		return asciiElements;
	}
	componentWillMount() {
	 	this.fetchAscii(1)
	}
	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}
	componentWillUnmount() {
	     window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll(e){
		if ((window.innerHeight + window.scrollY) >= ( document.body.offsetHeight )) {
			window.removeEventListener('scroll', this.handleScroll);
		    var elemLength = this.state.asciiElements.length;
		    this.fetchAscii(elemLength)
		}
	}

	render(){
		console.log(this.state.asciiElements)
		return (
			<div className='p_B-2x'>
				<div className='daw-row'>
					{this.state.asciiElements}
				</div>

				{this.loadingImage(1)}
			</div>


		);
	}
}
