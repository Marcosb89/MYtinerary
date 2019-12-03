import React from 'react';
import { connect } from 'react-redux';
import Landing from './Landing';
import Toolbar from './Toolbar'
import getProfileFetch from '../actions/getProfileFetchAction'


class App extends React.Component {
	componentDidMount = () => {
    this.props.getProfileFetch()
	}
	
  render() {
		return(	
			<div className="App">
				<Toolbar />
				<Landing />
			</div>
		)
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch())
})

export default connect(null, mapDispatchToProps)(App);