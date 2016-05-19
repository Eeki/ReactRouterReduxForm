import React, {Component} from 'react'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Step, Stepper, StepButton} from 'material-ui/Stepper';

import { toHomeFormPage } from '../../../actions/index';


class HomeFormProgressBar extends Component {
  
  render() {
    const steps = this.props.stepsData.map((stepData) => {
      return(
        <Step key={stepData.page} active={true} disabled={(this.props.pageVisited < stepData.page)} >
          <StepButton page={stepData.page} onClick={() => this.props.handleStepClick(stepData.page)} >{stepData.text}</StepButton>
        </Step>)
    });

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper linear={false} activeStep={this.props.page} >
          {steps}
        </Stepper>

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ goToPage: toHomeFormPage}, dispatch);
}

export default connect(null, mapDispatchToProps)(HomeFormProgressBar)

