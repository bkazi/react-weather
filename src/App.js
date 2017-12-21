import React, {Component} from 'react';

import WeatherList from './WeatherList';
import WeatherSearch from './WeatherSearch';
import Location from './Location';

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
        <Location render={({isLoading, coords, err}) =>
          <div>
            <WeatherSearch onCityIdChange={this.onCityIdChange}/>
            <WeatherList cityId={this.state.cityId} coords={coords}/>
          </div>
        } />
    );
  }
}

export default App;
