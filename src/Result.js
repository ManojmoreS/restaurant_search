import React, { Component } from 'react';
import { ListGroup, Image, Spinner, Alert } from 'react-bootstrap'
import axios from 'axios';
const config = {
  headers: {'Authorization': "Bearer wfjGJjybjdhG0J0LVynQTGytYSx3wWFq86tLagik1Q4VuQNV_RsSMldrz3tdjk_0oC30nRp1ba3PsvsXg1s5c7fx3Wcz9_ZgUcczJpRBcbXd2qLv2_TUH6s64KKbXHYx"},
  params: { // term: '', location: '', latitude: 0, longitude: 0
  }
};

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }
  componentDidMount() {
    console.log('componentsDidmount result');
    var data = this.props.data
    if (data.term !== null) {
      config.params.term = data.term
    }
    if (data.lng !== 0) {
      config.params.longitude = data.lng
    }
    if (data.lat !== 0) {
      config.params.latitude = data.lat
    }
    axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search', config)
    .then(response => {
      console.log(response.data);
      this.setState({
        data: response.data.businesses
      });
    })
    .catch(err => console.log (err));
  }

  render() {
    return (
      <div>
      <ListGroup>
        {
          this.state.data==null ?
            <div>
              <Spinner animation="border" variant="success" role="status" /> Hi!, Let me gather data for you...
            </div> :
            this.state.data.length===0 ?
            <Alert variant='danger'>
              Sorry couldn't find any results
            </Alert> :
          this.state.data.map(function(d, idx){
            return (
              <ListGroup.Item action key={idx} onClick={()=> window.open(d.url, "_blank")}>
                <Image src={d.image_url} roundedCircle fluid/>
                <h5>{d.name}</h5>
                <p>Address :{Object.values(d.location)}</p>
              </ListGroup.Item>
            )
          })
        }
        </ListGroup>
      </div>
    )
  }
}
export default Result;
