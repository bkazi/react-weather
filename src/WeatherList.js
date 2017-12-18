import React, {Component} from 'react';

const API_URL = 'forecast.json';

class WeatherList extends Component {
	state = {
		city: '',
		weather: [],
		loaded: false,
	};

	componentDidMount() {
		fetch(API_URL)
		.then(res => res.json())
		.then(this.processData);
	}

	processData = (json) => {
		console.log(json);
		const city = json.city.name;
		const weather = json.list
			.slice(0, 8)
			.map((item) => ({
				date: new Date(item.dt * 1000).toDateString(),
				desc: item.weather[0].description,
				min: item.main.temp_min - 273,
				max: item.main.temp_max - 273,
			}));
		console.log(weather);
		this.setState({
			city,
			weather,
			loaded: true,
		});
	}

  render() {
    return (
			!this.state.loaded ? <div>Loading</div> : <div>
				<div>{this.state.city}</div>
				{this.state.weather.map((w, i) => <div key={i}>{w.date} {w.desc} {w.min} {w.max}</div>)}
			</div>
    );
  }
}

export default WeatherList;
