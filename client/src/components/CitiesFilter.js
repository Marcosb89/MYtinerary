import React, { Component } from 'react'

export default class CitiesFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cityFilter: ""
    }
  }
  
  handleChange = (e) => {
    this.setState({
      cityFilter: e.target.value
    })
    this.props.onChange(e.target.value)
  }
  
  
  render() {
    return (
      <div>
        <p style={{marginBottom: '0px'}}>Filter our current cities</p>
        <input type="text" id="filter" value={this.state.cityFilter} onChange={this.handleChange}/>
      </div>
      )
  }
}




