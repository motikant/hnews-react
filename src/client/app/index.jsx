import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './extraComponent.jsx';
import SearchComponent from './SearchComponent.jsx';

class App extends React.Component {
  render () {
      return (
		  <div>
		  <p> Hello React!</p>
		  <SearchComponent/>
		  </div>
	  );
    }
}

render(<App/>, document.getElementById('app'));
