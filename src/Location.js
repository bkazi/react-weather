import {Component} from 'react';

class Location extends Component {
    state = {
        isLoading: false,
        coords: {},
        err: null,
    };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                this.setState({isLoading: false, coords: pos.coords, err: null});
            },
            (err) => {
                this.setState({isLoading: false, coords: {}, err: err});
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