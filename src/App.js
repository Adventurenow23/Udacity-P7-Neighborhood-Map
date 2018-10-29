import React, { Component } from 'react';
import './App.css';
import Map from './component/Map';
import SquareAPI from './API/';
import SideBar from './component/SideBar';

class App extends Component {
constructor () {
super();
  this.state ={
    venues:[],
    markers:[],
    center:[],
    zoom: 12, 
    updateSuperState: obj => {
      this.setState(obj);
    }
  };
}
//All markers are in default state when screen loads//
closeAllMarkers = () => {
  const markers = this.state.markers.map(marker => {
  marker.isOpen = false;
  return marker;
  });
this.setState({markers: Object.assign(this.state.markers,markers) });
};

//When one marker is clicked, infowindow, picture and name appear as information from foursquare api. If another is clicked, then previous marker closes//
handleMarkerClick = (marker) => {
  this.closeAllMarkers();
  marker.isOpen = true;
  this.setState({markers: Object.assign(this.state.markers, marker) });
  const venue = this.state.venues.find(venue => venue.id = marker.id);

SquareAPI.getVenueDetails(marker.id).then(res=> {
const newVenue = Object.assign(venue, res.response.venue);
this.setState({venues:Object.assign(this.state.venues,newVenue)})
  console.log(newVenue);
});
};

handleListUnitClick = venue => {
  //If list unit item is clicked on menu, infowindow and picture appear on select marker//
  const marker = this.state.markers.find(marker => marker.id = venue.id);
  this.handleMarkerClick(marker);
};
//Map is centered with a 15 pizza venue request in one specific regional area
//All information is retrieved from foursquare API//
  componentWillMount() {
    SquareAPI.search({
      near: "Naperville, IL",
      query: "Pizza",
      limit: 15
    }).then (results => {
      const venues = results.response.venues;
      const center = results.response.geocode.feature.geometry.center;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        
      };
    }); 
    this.setState({
      venues: venues,
      markers: markers,
      center: center
    });
    console.log(results); 
    console.log(this.state);
  });

   // Google map api load error
   window.gm_authFailure = () => {
     window.alert('google maps error');
   };
}
  render() {
    return (
      <div className="App">
      < SideBar 
        venues={this.state.venues} 
        markers={this.state.markers}
        updateSuperState={this.state.updateSuperState}
        handleListUnitClick={this.handleListUnitClick} />
        < Map {...this.state} 
        handleMarkerClick= {this.handleMarkerClick} />
      </div>
    );
  }
}


export default App;


//Attributes for this project are given with great gratitude to:
//Forrest Walker, Jason Michael White, James D. Bartlett3, Robert Allen, Ryan Waite, hColleen,
//the entire Undefined1 cohort, Janice Medina and Crystal for their "wonderlists" and the entire Udacity Administration and Coordination Team for all of the hard work and motivation to all students other than myself for the past year.

//===Web Resources===// 
//Tutorial from Forrest Walker: https://www.youtube.com/channel/UCKbBXgnuGVHxySwfc6JsWnA//
//https://developers.google.com/maps/documentation/javascript/get-api-key//
//https://developer.foursquare.com/
//https://github.com/facebook/create-react-app
//https://tomchentw.github.io/react-google-maps/#hocs
//Tutorial from Ryan Waite: https://www.youtube.com/channel/UCRb4dFjhmm8RfvTgIfBtXFg
//Tutorial from Doug Brown: https://youtu.be/NVAVLCJwAAo