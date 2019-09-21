import React, { Component } from 'react';
import { Container, Row, Col} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import Result from './Result';
import MoreMap from './map';

class App extends Component {
  constructor(props) {
    super(props);
    this.handlerMapSeacrh = this.handlerMapSeacrh.bind(this);
    this.state = { lat: 0, lng: 0 };
  }

  handlerMapSeacrh(childdata) {
    var geoloc = childdata.markers[0]
    if(geoloc){
      this.setState({ lat: geoloc.position.lat(), lng: geoloc.position.lng()})
    }
    console.log('Got map state');
    console.log(this.state);
  }

  render() {
    return (
      <div className="App">
      <Container>
        <Row>
          <Col md={4}>
          Yelp Result
          </Col>
          <Col md={{ span: 8}}>
          GoogleMap
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Result data={this.state}/>
          </Col>
          <Col md={{ span: 8}}>
          <MoreMap handlerMapSeacrh={this.handlerMapSeacrh}/>
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}
export default App;
