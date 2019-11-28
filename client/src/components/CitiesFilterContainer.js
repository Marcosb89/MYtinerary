import React, { Component } from 'react';
import CitiesFilter from './CitiesFilter'
import { Link } from 'react-router-dom'

export default class CitiesFilterContainer extends Component {
  constructor() {
    super()
    this.state = {
      cities: [],
      filteredCities: []
    }
  }

  componentDidMount = async () => {
    await fetch('http://localhost:5000/cities')
    .then(response=> response.json())
    .then(cities => {
      this.state.cities = cities
      this.state.filteredCities = cities
    });
  }

  filterCities = (cityFilter) => {
    let filteredCities = this.state.cities
    filteredCities = filteredCities.filter((city) => {
      let cityName = city.name.toLowerCase()
      return cityName.indexOf(
        cityFilter.toLowerCase()) === 0
    })
    this.setState({
      filteredCities
    })
  }

   citiesList() {
    const cities = this.state.filteredCities;  
		const listCities = cities.map(city =>{      
    //let urlImg = city.url.split("/")[3]
    let urlImg = city.url;
    let imgCity = require('../assets/images/'+ urlImg)
      return(
        <li style={{backgroundImage: "url(" + imgCity + ")", 
          backgroundSize: 'cover', backgroundPosition: 'center', height: '150px'}}
          key={city.name}>
        <Link to={'/cities/' + city.name}><p>{city.name}, {city.country}</p></Link>
        </li>)}
      );
    return(
      <div className = 'listCities'>
			  <ul>{listCities}</ul>
      </div>
    );
	}

  render() {
    return (
     <div>
      <div className='mainCities'>
        <h3 className = 'hTittle'>Cities</h3>
        <CitiesFilter cities={this.state.filteredCities} match={this.props.match} onChange={this.filterCities}/>
        {this.citiesList()}
			</div>
    </div>
   )
  }
}

