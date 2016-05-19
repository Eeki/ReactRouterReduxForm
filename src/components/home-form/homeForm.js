import React, {Component} from 'react';
import HomeFormIndex from './homeFormIndex';
import { createHome } from '../../actions/index';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
require('../../style/style.css');


//toDo docker-compose up
//toDo ./gradlew bootRun
//toDo http://localhost:8080/swagger-ui.html <-- ja nyt oikeesti tee uus projekti siis homerForm!
//toDo docker-compose down <-- kun lopetat

class HomeForm extends Component {
  render() {
    return(
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        < HomeFormIndex  onSubmit={ createHome}/>
      </MuiThemeProvider>
    )
  }
}

export default HomeForm