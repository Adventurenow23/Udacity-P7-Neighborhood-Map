// This component's code is from react-google-maps implementation instructions https://tomchentw.github.io/react-google-maps/#installation//
//Google Map API keys were retrieved from: https://console.cloud.google.com/google/maps-apis/apis/maps-backend.googleapis.com//

//Map is constructed using Google Maps Javascript API and generates markers in connection with App.js//

import React, { Component } from 'react'
import '../App.css'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'

const MyMapComponent = withScriptjs(
	withGoogleMap((props) => (
		<GoogleMap
			defaultZoom={7}
			zoom={props.zoom}
			defaultCenter={{ lat: 41.821975, lng: -88.088488 }}
			center={{
				lat: parseFloat(props.center.lat),
				lng: parseFloat(props.center.lng)
			}}
			options={{
				scrollwheel: false,
				mapTypeControl: false,
				fullscreenControl: false,
				streetViewControl: false,
				zoomControl: false
			}}
		>
			{props.markers &&
				props.markers.filter((marker) => marker.isVisible).map((marker, idx, arr) => {
					const venueInfo = props.venues.find((venue) => (venue.id = marker.id))

					return (
						<Marker
							key={idx}
							tabindex="0"
							position={{ lat: marker.lat, lng: marker.lng }}
							onClick={() => props.handleMarkerClick(marker)}
							animation={
								arr.length === 1 || marker.isOpen ? (
									window.google.maps.Animation.BOUNCE
								) : (
									window.google.maps.Animation.DROP
								)
							}
						>
							{marker.isOpen &&
							venueInfo.bestPhoto && (
								<InfoWindow aria-label=" infowindow">
									<React.Fragment>
										<img
											src={`${venueInfo.bestPhoto.prefix}200x200${venueInfo.bestPhoto.suffix}`}
											alt={'venueInfo.name'}
										/>
										<p className="info-name">{venueInfo.name}</p>
									</React.Fragment>
								</InfoWindow>
							)}
						</Marker>
					)
				})}
		</GoogleMap>
	))
)

export default class Map extends Component {
	render() {
		window.gm_authFailure = () => {
			this.props.handleError(`
  GoogleMaps API failed to authenticate.
  Please ensure that your API key and/or or client ID are correct`)
		}

		return (
			<MyMapComponent
				role="application"
				aria-label="map"
				{...this.props}
				googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCfpgeBLmhLfKXWZ699Jud0pAgHMeVFUug"
				loadingElement={<div className="myMap" />}
				containerElement={<div className="myMap-container" />}
				mapElement={<div className="myMap" />}
			/>
		)
	}
}
