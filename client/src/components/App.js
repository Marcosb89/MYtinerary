import React from 'react';
import Landing from './Landing';
import Toolbar from './Toolbar'


class App extends React.Component {
  render() {
		return(	
			<div className="App">
				<Toolbar />
				<Landing />
			</div>
		)
  }
}

export default App;
