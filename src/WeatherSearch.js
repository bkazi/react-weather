import React, {Component} from 'react'

const SEARCH_BASE_URL = 'http://localhost:8080';

class WeatherSearch extends Component {
    state = {
        results: [],
    };

    searchCity = (searchString, onComplete) => {
        function onLoad() {
            const results = JSON.parse(this.responseText);
            onComplete(results);
        }

        const req = new XMLHttpRequest();
        req.addEventListener('load', onLoad);
        req.open('GET', `${SEARCH_BASE_URL}?q=${searchString}&lim=5`);
        if (this.xhr) this.xhr.abort();
        this.xhr = req;
        this.xhr.send();
    }

    onCityInput = (e) => {
        const searchString = e.target.value;
        this.searchCity(searchString, (results) => {
            this.setState({
                results,
            });
        });
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="City" onChange={this.onCityInput}></input>
                <div>
                    {this.state.results.map(city => <div key={city.id}>{city.name}, {city.country}</div>)}
                </div>
            </div>
        );
    }
}

export default WeatherSearch;