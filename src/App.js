import React, {Component} from 'react';

import WeatherList from './WeatherList';
import WeatherSearch from './WeatherSearch'

class App extends Component {
  state = {
    cityId: null,
  }

  onCityIdChange = (cityId) => {
    console.log(cityId);
    this.setState({
      cityId,
    });
  }

  render() {
    return (
      <div>
			  <WeatherSearch onCityIdChange={this.onCityIdChange}/>
        <WeatherList cityId={this.state.cityId}/>
      </div>
    );
  }
}

export default App;
