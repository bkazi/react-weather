import {Component} from 'react';

class Location extends Component {
    state = {
        isLoading: false,
        coords: null,
        err: null,
    };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                this.setState({
                    isLoading: false,
                    coords: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                    },
                    err: null,
                });
            },
            (err) => {
                this.setState({isLoading: false, coords: null, err: err});
            },
            {
                enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: 5000,
            }
        );
        this.setState({isLoading: true});
    }

    render() {
        return this.props.render({
            isLoading: this.state.isLoading,
            coords: this.state.coords,
            err: this.state.err,
        })
    }
}

export default Location;