import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';
require('../../style/style.css');

export const fields = [ 'images' ];

//toDo hakee facebook kuvat, jos on kirjautunut sillä sisään.
//toDo opettele facebook rajapinnat
class HomeFormThirdPage extends Component {


  onDrop(files) {
    this.props.fields.images.onChange(files);
    console.log('Received files:', files)
  }

  render() {
    const styles = {
      button: {
        margin: 12
      },
      exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
      },
    };

    const {
      fields: { images },
      handleSubmit,
      previousPage,
      submitting
    } = this.props

    return (
      <div>
        <Dropzone onDrop={this.onDrop}>
          <span className="dropZoneTextCenter">
            Vedä kuvat kentään tai klikkaa kentää
          </span>
        </Dropzone>
        <div>
          <p>kaikki vanhat selaimet eivät tue kuvien raahaamista valintakenttään. <br/>
          Voit ladata kuvat myös tästä:
          </p>
          <RaisedButton
            label="Valitse kuva"
            labelPosition="before"
            style={styles.button}
          >
            <input type="file" style={styles.exampleImageInput} />
          </RaisedButton>
        </div>
        <img src="https://graph.facebook.com/4/picture"/>
      </div>
    )
  }
}

HomeFormThirdPage.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'homeForm',              // <------ same form name
  fields,                      // <------ all fields on last wizard page
  destroyOnUnmount: false     // <------ preserve form data
})(HomeFormThirdPage)