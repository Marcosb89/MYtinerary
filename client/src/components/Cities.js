import React from 'react'
import Toolbar from './Toolbar';
import { connect } from 'react-redux';
import { getCities } from '../actions/citiesActions';
import CitiesFilterContainer from './CitiesFilterContainer';

class Cities extends React.Component {

	//GETS CITY LIST FROM THE SERVER
	componentDidMount() {
		fetch('http://localhost:5000/Cities')
		.then(response=> response.json())
		.then(cities => {
			this.props.getCities(cities)
		});
	}

	//RENDERS THE HTML LIST
	/*citiesList(props) {
		const cities = this.props.stateCities;
		const cities = this.props.stateCities;
		const listCities = cities.map(city =>
		<li class= 'citiesList' key={city.name}>
		{city.name}, {city.country}
		</li>
		);
		return(
			<ul>{listCities}</ul>
		);
	}*/

	render(){
		return (
			<div>
				<Toolbar />
				<CitiesFilterContainer />
			</div>
		)
	}
}

//APPLY REDUX STATES MANAGEMENT
const mapStateToProps = state => {
	return {	stateCities: state.cities
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getCities: data => {
			dispatch(getCities(data))		
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities);