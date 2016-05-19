import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import debounce from 'lodash/debounce';
import axios from 'axios';

import HomeFormMapBox from './components/homeFormMapBox';
import { validateHomeFormFirstPage } from './validation';

export const fields = [ 'address', 'city', 'zipCode', 'neighborhood', 'coordinates' ];

//toDo voi halutessaan laitaa myös oman osoite nimen eli esim vain osan osoitteesta <- meneekö ilmoitusken viimeistelyyn?
class HomeFormFirstPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
      selectedAddress: {}
    };
    this.searchAddress = debounce(this.searchAddress, 1000);
  }



  searchAddress(address) {
    const ROOT_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    const PARAMETERS = '&components=locality:HKI|country:FI';
    const API_KEY = '&key=AIzaSyDMEOwzI9KJdoZ_fGWHrkxvkvTuDuwybl8';
    const fields = this.props.fields;

    console.log("searchAddress")

    axios.get(`${ROOT_URL}${address}${PARAMETERS}${API_KEY}`)
      .then(function (response) {
        const result = response.data.results[0];
        
        const address = {
          address: `${result.address_components[1].long_name} ${result.address_components[0].long_name}`,
          city: result.address_components[2].long_name,
          zipCode: result.address_components[5].long_name,
          coordinates: [result.geometry.location.lng, result.geometry.location.lat]
        };
        console.log('address', address);
        fields.coordinates.onChange(address.coordinates);
        fields.zipCode.onChange(address.zipCode);
        fields.city.onChange(address.city);

      })

      .catch(function (response) {
        console.log("searchAddress error",response);
      });
  }

  makeOnChange(field) {
    return (input) => {
      field.onChange(input);
      if(input.target.value.length > 2){
        this.searchAddress(input.target.value)
      }
    }
  }

  setPropsToMap() {
    const coordinates = this.props.fields.coordinates.value;
    const address = this.props.fields.address.value;
    console.log('setPropsToMap', coordinates, address)
    if(coordinates && address) {
      console.log("we have coordinates and address")
      return {
      coordinates, address
      }
    } else {
      console.log("NO coordinates and address")
      return {
        coordinates: null, address: null
      }
    }
  }

  render() {

    const styles = {
      button: {
        margin:12,
        float: 'right'
      },input: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
      }};

    const {
      fields: {address, city, zipCode, neighborhood},
      handleSubmit
    } = this.props;
    
    return (
      <div className="home-form-panel col-md-12">
        <h3 className="header-home-form-panel">1. Missä kohde sijaitsee?</h3>
        <div className="row">
          <div className="col-md-5">
            <form autoComplete='off' onSubmit={handleSubmit} id="homeFormFirstPageForm">

              <div className="col-md-12">
                <TextField
                  hintText='Esim Museokatu 46 C 64'
                  errorText={ address.touched && address.error ? address.error : ''}
                  floatingLabelText="Osoite"
                  floatingLabelFixed={true}
                  {...address}
                  onChange = {this.makeOnChange(address)}
                />
              </div>

              <div className="col-md-12">
                <TextField
                  hintText='Esim Helsinki'
                  errorText={ city.touched && city.error ? city.error : ''}
                  floatingLabelText="Kaupunki"
                  floatingLabelFixed={true}
                  {...city}
                />
              </div>

              <div className="col-md-12">
                <TextField
                  hintText='Esim 00550'
                  errorText={ zipCode.touched && zipCode.error ? zipCode.error : ''}
                  floatingLabelText="Postinumero"
                  floatingLabelFixed={true}
                  {...zipCode}
                />
              </div>

              <div className="col-md-12">
                <TextField
                  hintText='Esim Kallio'
                  errorText={ neighborhood.touched && neighborhood.error ? neighborhood.error : ''}
                  floatingLabelText="Kaupunginosa"
                  floatingLabelFixed={true}
                  {...neighborhood}
                />
              </div>
            </form>
          </div>

          <div className="col-md-6 mapholder">
            <HomeFormMapBox homeLocation = {this.setPropsToMap()}/>
          </div>
        </div>
        <div className="col-md-12">

          <RaisedButton
            primary={true}
            label="Seuraava"
            labelPosition="before"
            style={styles.button}
          >
            <input type="submit" form="homeFormFirstPageForm" style={styles.input}/>
          </RaisedButton>
        </div>
      </div>
    )
  }
}

HomeFormFirstPage.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  touchOnBlur: false,
  form: 'homeForm',            // <------ same form name
  fields,                      // <------ only fields on this page
  destroyOnUnmount: false,     // <------ preserve form data
  validate : validateHomeFormFirstPage                // <------ only validates the fields on this page
})(HomeFormFirstPage)