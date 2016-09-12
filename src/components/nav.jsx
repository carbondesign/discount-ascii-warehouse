import React, { Component } from 'react';

export default class Nav extends Component {

	constructor(props) {
		super(props);
		this.state = {
			sticky: false
		};
		this.handleScroll = this.handleScroll.bind(this);
	}
	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}
	componentWillUnmount() {
	    window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll(e){
		let offset = window.scrollY - window.innerHeight;
		console.log(window.innerHeight , window.scrollY)
		if (window.scrollY >= 60) {
		    this.setState({
		    	sticky:true
		    })
		}else{
			this.setState({
		    	sticky:false
		    })
		}
	}

	render(){
		return (
			<nav className={this.state.sticky ? 'sticky' : null}>
				<div className="daw-container">
					<img src="./images/moss.gif" alt=""/>
					{'Discount Ascii Warehouse'}
				</div>
			</nav>
		)
	}

}
