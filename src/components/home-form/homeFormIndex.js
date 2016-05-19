import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';

import HomeFormFirstPage from './homeFormFirstPage'
import HomeFormSecondPage from './homeFormSecondPage'
import HomeFormThirdPage from './homeFormThirdPage'
import HomeFormProgressBar from './components/homeFormProgressBar';
import { STEPPER_DATA } from '../../data/homeFormData';

class HomeFormIndex extends Component {
  constructor(props) {
    super(props)

    // Pro tip: The best place to bind your member functions is in the component constructor
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.handleStepClick = this.handleStepClick.bind(this);
    
    this.state = {
      page: 0,
      pageVisited : 0
    }
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 })

    if(this.state.pageVisited === this.state.page) {
      this.setState({pageVisited: this.state.pageVisited + 1})
    }
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  handleStepClick(toPage) {
    this.setState({page: toPage})
  }
  
  render() {
    const { onSubmit } = this.props;
    const { page } = this.state;
    return (
      <div className="col-xs-12 col-md-10">
        <div className="row">
          <HomeFormProgressBar stepsData={STEPPER_DATA} handleStepClick={this.handleStepClick}  page={this.state.page} pageVisited={this.state.pageVisited}/>
        </div>
        <div className="row">
          {page === 0 && <HomeFormFirstPage onSubmit={this.nextPage}/>}
          {page === 1 && <HomeFormSecondPage previousPage={this.previousPage} onSubmit={this.nextPage}/>}
          {page === 2 && <HomeFormThirdPage previousPage={this.previousPage} onSubmit={onSubmit}/>}
        </div>
      </div>
    )
  }
}

HomeFormIndex.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    pageIndex: state.homeFormNavigation
}
}

export default connect(mapStateToProps)(HomeFormIndex)