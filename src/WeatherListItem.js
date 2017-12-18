import React, {Component} from 'react';

class WeatherListItem extends Component {
    render() {
        const w = this.props.weather;
        return (
            <div>
                <div>{w.date}</div>
                <div>{w.desc}</div>
                <div>{Math.round(w.max)} C</div>
                <div>{Math.round(w.min)} C</div>
                <br />
            </div>
        );
    }
}

export default WeatherListItem;