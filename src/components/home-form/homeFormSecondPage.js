import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField';
import RadioButtonGroup from 'material-ui/RadioButton/RadioButtonGroup'
import RadioButton from 'material-ui/RadioButton/RadioButton'
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import SelectorMUI from './components/selectorMUI';
import { validateHomeFormSecondPage } from './validation';

export const fields = [ 'address', 'neighborhood', 'title', 'description', 'rent', 'deposit', 'livingArea', 'numberOfRooms', 'kitchenType', 'sauna', 'balcony', 'rooms' ]


class HomeFormSecondPage extends Component {

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
      fields: { title, description, rent, deposit, livingArea, numberOfRooms, kitchenType, sauna, balcony, rooms },
      handleSubmit,
      previousPage
    } = this.props
    const floatinglabelCustomStyle = {color: 'black'};

    return (
        <div className="home-form-panel col-md-12">
          <h3 className="header-home-form-panel">2. Perustiedot</h3>
          <div className="col-md-12">
            <form autoComplete='off' onSubmit={handleSubmit} id="homeFormSecondPageForm">

            <TextField
              floatingLabelStyle={floatinglabelCustomStyle}
              errorText={ title.touched && title.error ? title.error : ''}
              floatingLabelText="Ilmoituksen otsikko"
              floatingLabelFixed={true}
              fullWidth={true}
              {...title}
            />
            <TextField
              floatingLabelStyle={floatinglabelCustomStyle}
              errorText={ description.touched && description.error ? description.error : ''}
              floatingLabelText="Esittelyteksi"
              floatingLabelFixed={true}
              multiLine={true}
              rows={1}
              fullWidth={true}
              {...description}
            />
            <br/>
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <TextField
                  disabled={true}
                  defaultValue={this.props.fields.address.value}
                  floatingLabelText="Osoite"
                />
              </div>

              <div className="col-md-6 col-sm-12">
                <TextField
                  disabled={true}
                  defaultValue={this.props.fields.neighborhood.value}
                  floatingLabelText="Asuinalue"
                />
              </div>
            </div>
            <br/>
              <div className="row">
                <div className="col-md-6 col-sm-12">
                <TextField
                  floatingLabelStyle={floatinglabelCustomStyle}
                  errorText={ rent.touched && rent.error ? rent.error : ''}
                  floatingLabelText="Vuokra"
                  floatingLabelFixed={true}
                  {...rent}
                />
                <span className="spanAfterMUITextField">€/kk</span>
                </div>

                <div className="col-md-6 col-sm-12">
                  <TextField
                    floatingLabelStyle={floatinglabelCustomStyle}
                    errorText={ deposit.touched && deposit.error ? deposit.error : ''}
                    floatingLabelText="Vuokravakuus"
                    floatingLabelFixed={true}
                    {...deposit}
                  />
                </div>
              </div>
              <br/>

              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <TextField
                    floatingLabelStyle={floatinglabelCustomStyle}
                    errorText={ livingArea.touched && livingArea.error ? livingArea.error : ''}
                    floatingLabelText="Asuinpinta-ala"
                    floatingLabelFixed={true}
                    {...livingArea}
                  />
                  <span className="spanAfterMUITextField">m<sup>2</sup></span>
                </div>

                <div className="col-md-6 col-sm-12">
                  <TextField
                    floatingLabelStyle={floatinglabelCustomStyle}
                    errorText={ numberOfRooms.touched && numberOfRooms.error ? numberOfRooms.error : ''}
                    floatingLabelText="Huoneiden lukumäärä"
                    floatingLabelFixed={true}
                    {...numberOfRooms}
                  />
                </div>
              </div>
              <br/>

              <div className="row">
                <div className="col-md-6 col-sm-12">
                <TextField
                  floatingLabelStyle={floatinglabelCustomStyle}
                  errorText={ rooms.touched && rooms.error ? rooms.error : ''}
                  floatingLabelText="Huoneiston kokoonpano"
                  floatingLabelFixed={true}
                  {...rooms}
                />
                </div>
                <div className="col-md-6 col-sm-12">
                  <SelectorMUI
                    value={kitchenType.value}
                    floatingLabelStyle={floatinglabelCustomStyle}
                    floatingLabelFixed={true}
                    errorText={ kitchenType.touched && kitchenType.error ? kitchenType.error : ''}
                    floatingLabelText="Valitse keittiötyyppi"
                    {...kitchenType}
                  >
                    <MenuItem key={1} value={"no_kitchen"} primaryText="Ei keittiötä" />
                    <MenuItem key={2} value={"kitchen"} primaryText="Keittiö" />
                    <MenuItem key={3} value={"kitchenette"} primaryText="Keittokomero" />
                    <MenuItem key={4} value={"open_kitchen"} primaryText="Avokeittiö" />
                  </SelectorMUI>

                </div>
              </div>
              <br/>
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <label style={{color: sauna.touched && sauna.error ? "rgb(244, 67, 54)" : ''}}>Onko asunnossa saunaa?</label>
                  <RadioButtonGroup {...sauna}
                    name="sauna"
                    defaultSelected={sauna.value}
                  >
                    <RadioButton
                      value="true"
                      label="Kyllä"
                      style={{ width: '150px' }}
                    />
                    <RadioButton
                      value="false"
                      label="Ei"
                      style={{ width: '150px' }}
                    />
                  </RadioButtonGroup>
                </div>

                <div className="col-md-6 col-sm-12">
                  <label style={{color: balcony.touched && balcony.error ? "rgb(244, 67, 54)" : ''}}>Onko asunnossa parveke?</label>
                  <RadioButtonGroup
                    {...balcony}
                    name="balcony"
                    defaultSelected={balcony.value}
                  >
                    <RadioButton
                      value="true"
                      label="Kyllä"
                      style={{ width: '200px' }}
                    />
                    <RadioButton
                      value="false"
                      label="Ei"
                      style={{ width: '200px' }}
                    />
                  </RadioButtonGroup>
                </div>
              </div>
              <br/>

            </form>
          </div>
          <div className="col-md-12">
            <RaisedButton
              primary={true}
              label="Seuraava"
              labelPosition="before"
              style={styles.button}
            >
              <input type="submit" form="homeFormSecondPageForm" style={styles.input}/>
            </RaisedButton>

            <RaisedButton
              label="Edellinen"
              labelPosition="before"
              style={styles.button}
            >
              <input type="button" onClick={previousPage} style={styles.input}/>
            </RaisedButton>
          </div>
          
        </div>

      
    )
  }
}

HomeFormSecondPage.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired
};

export default reduxForm({
  touchOnBlur:false,
  form: 'homeForm',              // <------ same form name
  fields,                      // <------ only fields on this page
  destroyOnUnmount: false,     // <------ preserve form data
  validate : validateHomeFormSecondPage   // <------ only validates the fields on this page
})(HomeFormSecondPage)