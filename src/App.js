import React,{Component} from 'react';
import {Provider} from 'react-redux'
import Main from './components/Maincomponent'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';
import './App.css'
import {BrowserRouter} from 'react-router-dom'
import {configureStore} from './redux/configureStore'

const store = configureStore()
class App extends Component {  
  render(){
    return (
    <React.Fragment >
      <Provider store = {store}>
        <BrowserRouter>  
          <Main/>
        </BrowserRouter>
      </Provider>
      
    </React.Fragment>
  );}
  
}

export default App;
