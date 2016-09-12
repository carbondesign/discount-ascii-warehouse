import React, { Component } from 'react';
import handleApi from '../../lib/http-handle-api';
import AsciiItem from './asciiItem';
import Ad from './ad';
import * as Utils from '../utils/'

export default class AsciiList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			asciiElements: [],
			isLoading:true,
			sortBy: 'id',
    		sortDir: null
		};
		this.handleScroll = this.handleScroll.bind(this);
		this.fetchAscii = this.fetchAscii.bind(this);
	}

	fetchAscii(offset){

		this.setState({isLoading : true })
		const API = {url: ('http://localhost:8000/api?limit=20&skip=' + offset)}
		const ascii = this;
		self = this;
		fetch(API.url)

			.then(Utils.status)
			.then(function (json) {
				if (json.err) {
					console.log('Error ' + json.err);
				} else {
					let newJSON = [];
					json.writeHead = (statusCode, contentType) => {return json;}
					handleApi(API, json);

					json.write = (result) => { newJSON.push(Utils.json(result))}
					json.end = () => {

						let newSet = self.buildElements(newJSON);
						console.log('fetching',self.state.asciiElements,newSet);
						let newItems = self.state.asciiElements.push(newSet)
						ascii.setState({
							asciiItems : newItems,
							isLoading : false
						});
						window.addEventListener('scroll', self.handleScroll);
					};
					console.log(json);
				  return json;

				}
			})
			.catch(function (error) {
				console.log('Error fetching data: ' + error);
			});
	}

	loadingImage(i){
		if (this.state.isLoading) {
			return (<div className='daw-row'>
				<div className='loadingGIF fadeIn animated'>
					<img key={'catad-' }  src='http://www.owlhatworld.com/wp-content/uploads/2015/12/50.gif'/>
				</div>
			</div>)
		}
	}
	buildElements(items){
		var asciiElements = [];
		for (var i = 0; i < items.length; i++) {
			asciiElements.push(<AsciiItem item={items[i]} key={'item-' + items[i].id} className={ Number.isInteger((i + 1)/4) ? 'm_R-0':''}> </AsciiItem>)
		}
		asciiElements.push(<Ad></Ad>)
		return asciiElements;
	}
	componentWillMount() {
	 	this.fetchAscii(0)
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
			<div className='p_B-4x'>
				<div className='daw-row'>
					{this.state.asciiElements}
				</div>
				{this.loadingImage()}
			</div>


		);
	}
}
