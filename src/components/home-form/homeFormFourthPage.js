import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
export const fields = [ 'rentalType', 'zipCode', 'address', 'city', 'neighborhood', 'email', 'sex', 'favoriteColor', 'employed', 'notes' ]
//  All fields on last form

const validate = values => {
  const errors = {}
  if (!values.favoriteColor) {
    errors.favoriteColor = 'Required'
  }
  return errors
}

class HomeFormThirdPage extends Component {
  render() {
    const {
      fields: { favoriteColor, employed, notes },
      handleSubmit,
      previousPage,
      submitting
    } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <button type="button" disabled={submitting} onClick={previousPage}>
            <i/> Previous
          </button>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Finish
          </button>
        </div>
      </form>
    )
  }
}

HomeFormThirdPage.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'homeForm',              // <------ same form name
  fields,                      // <------ all fields on last wizard page
  destroyOnUnmount: false,     // <------ preserve form data
})(HomeFormThirdPage)