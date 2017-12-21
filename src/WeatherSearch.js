import React, {Component} from 'react'

const SEARCH_BASE_URL = 'http://localhost:8080';

const yourLoc = {name: "Your Location", id: null};

class WeatherSearch extends Component {
    state = {
        value: '',
        results: [yourLoc],
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
        const value = e.target.value;
        this.setState({value});
        this.searchCity(value, (results) => {
            this.setState({
                results: [yourLoc, ...results],
            });
        });
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="City" value={this.state.value} onChange={this.onCityInput}></input>
                <div>
                    {this.state.results.map(city => <div key={city.id} onClick={() => {
                        this.setState({value: '', results: [yourLoc]});
                        this.props.onCityIdChange(city.id);
                    }}>{city.name}, {city.country}</div>)}
                </div>
            </div>
        );
    }
}

export default WeatherSearch;