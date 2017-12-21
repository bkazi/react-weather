import React, {Component} from 'react';

import WeatherListItem from './WeatherListItem';

import {API_KEY} from './config';

const API_BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast/daily';
const ID_QUERY = 'id';
const LAT_QUERY = 'lat';
const LONG_QUERY = 'lon';
const API_KEY_QUERY = 'appid';
const LIMIT = 7;

class WeatherList extends Component {
	state = {
		city: '',
		weather: [],
		loaded: false,
	};

	getUrl = () => {
		const cityId = this.props.cityId;
		const coords = this.props.coords;
		const url = new URL(API_BASE_URL);
		if (!cityId && coords) {
			url.searchParams.append(LAT_QUERY, coords.latitude);
			url.searchParams.append(LONG_QUERY, coords.longitude);
		} else {
			url.searchParams.append(ID_QUERY, cityId);
		}
		url.searchParams.append(API_KEY_QUERY, API_KEY);
		return url.toString();
	}

	componentDidMount() {
		if (!this.props.cityId && !this.props.coords)
			return;
		fetch(this.getUrl())
		.then(res => res.json())
		.then(this.processData);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.cityId === prevProps.cityId && this.props.coords === prevProps.coords)
			return;
		fetch(this.getUrl())
		.then(res => res.json())
		.then(this.processData);
	}

	processData = (json) => {
		console.log(json);
		const city = json.city.name;
		const lim = json.cnt > LIMIT ? LIMIT+1 : json.cnt;
		const weather = json.list
			.slice(0, lim)
			.map((item) => ({
				date: new Date(item.dt * 1000).toDateString(),
				desc: item.weather[0].description,
				min: item.temp.min - 273,
				max: item.temp.max - 273,
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
				{this.state.weather.map((w, i) => <WeatherListItem key={i} weather={w} />)}
			</div>
    );
  }
}

export default WeatherList;
