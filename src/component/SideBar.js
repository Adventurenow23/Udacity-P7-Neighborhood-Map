import React, {
    Component
} from 'react';
import ListPlaces from './ListPlaces';
import Header from './header';

export default class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            venues: []
        };
    }

    handlefilterVenues = () => {
        if (this.state.query.trim() !== "") {
            const venues = this.props.venues.filter(venue =>
                venue.name.toLowerCase().includes(this.state.query.toLowerCase()))
            return venues;
        }
        return this.props.venues;
    };

    handleChange = e => {
        this.setState({
            query: e.target.value
        });

        const markers = this.props.venues.map(venue => {
            // toLowerCase so the user can use capital or lowercase in search query
            //str.includes(query) checks the str against the query.toLowerCase
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
            const nameMatched = venue.name
                .toLowerCase()
                .includes(e.target.value.toLowerCase());
            // const locationMatched = venue.location.formattedAddress[1]
            //     .toLowerCase()
            //     .includes(e.target.value.toLowerCase());
            const marker = this.props.markers.find(marker => marker.id === venue.id);
            //if the name or location matched marker is visible
            if (nameMatched) {
                marker.isVisible = true;
            } else {
                marker.isVisible = false;
            }
            //returning the markers that match
            return marker;
        });
        // this.props.updateSuperState({markers: Object.assign(this.props.markers, markers)});
        // this.props.updateSuperState({markers: markers});
        this.props.updateSuperState({
            markers: markers
        });
    };


    render() {
        return ( 
            <div className = "sideBar">
            <Header />
                <input type = {"search"}
                id = {"search"}
                placeholder = {"Filter Venues"}
                onChange = {this.handleChange}
                aria-label = {"search"}
                tabIndex = "0"
                />


            <ListPlaces {...this.props}
                venues = {this.props.venues}
                handlefilterVenues = {this.handlefilterVenues}
                handleListUnitClick = {this.props.handleListUnitClick}
            />
            </div>
        );
    }
}