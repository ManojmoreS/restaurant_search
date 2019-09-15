import React, { Component } from 'react';
import { Container, Row, Col} from 'react-bootstrap'
import { compose, withProps, lifecycle, withHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import Result from './Result';
const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");

const PlacesWithStandaloneSearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDAQOhuvUriLPgDzVblnSSH7BUj-s2EMSw&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  }),
  lifecycle({
    componentDidMount() {
      const refs = {}

      this.setState({
        places: [],
        lat: 40.7127753,
        lng: -74.0059728,
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          places.map(
            ({ place_id, formatted_address, geometry: { location } }) =>
            this.setState({
              places,
              lat: location.lat(),
              lng: location.lng()
            })
          )
        },
      })
    },
  }),
  withScriptjs
)(props =>
  <Container>
    <Row>
    <Col md={4}>
      <Result data={{term: 'food', lat: props.lat, lng: props.lng}}/>
    </Col>
    <Col md={{ span: 8}}>
    <div data-standalone-searchbox="">
      <StandaloneSearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          className='search_box'
          type="text"
          placeholder="Customized your placeholder"
          style={{
            boxSizing: `border-box`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            textOverflow: `ellipses`,
          }}
        />
      </StandaloneSearchBox>
      {props.places.map(({ place_id, formatted_address, geometry: { location } }) =>
      <MapWithAMarker
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDAQOhuvUriLPgDzVblnSSH7BUj-s2EMSw&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      lat_lng={ {lat:props.lat, lng:props.lng}}
      />
      )}

      <ol>
        {props.places.map(({ place_id, formatted_address, geometry: { location } }) =>
          <ul key={place_id}>
            {formatted_address}
            {" at "}
            ({location.lat()}, {location.lng()})
          </ul>
        )}
      </ol>
    </div>
    </Col>
    </Row>
  </Container>
);
const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: props.lat_lng.lat, lng: props.lat_lng.lng }}>
    <Marker position={{ lat: props.lat_lng.lat, lng: props.lat_lng.lng }} />
  </GoogleMap>
));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: 'Food',
      lat: 40.7128,
      lng: 74.0060
    };
  }

  render() {
    return (
      <div className="App">
        <PlacesWithStandaloneSearchBox />
      </div>
    );
  }
}

export default App;
