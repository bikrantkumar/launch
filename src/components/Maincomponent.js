import React, {Component} from 'react'
import Header from './header'
import Footer from './footer'
import Contactus from './contactus'
import Aboutus from './aboutus'
import Home from './home'
import {Switch,Route,Redirect,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {actions} from 'react-redux-form'
import { postFeedback } from '../redux/actionCreator'


const mapStateToProps = (state) =>{
    return{
        feedBack:state.feedBack
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        postFeedback: (firstname, lastname, telnum, email, agree, contactType,message)=>{dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType,message))},
        resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
    }
}
class Main extends Component{
    render(){
        return(
            <React.Fragment>
                <Header/>
                <Switch>
                    <Route exact path="/aboutus" component={Aboutus}/>
                    <Route exact path="/contactus" component={() => <Contactus resetFeedbackForm={this.props.resetFeedbackForm} postFeedback= {this.props.postFeedback} feedBack={this.props.feedBack}/>}/>
                    <Route exact path = "/home" component={Home}/>
                    <Redirect to="https://bikrantkumar.github.io/launch"/>
                </Switch>
                <Footer/>
            </React.Fragment>
            
        );
    }
}
export default withRouter(connect(mapDispatchToProps,mapStateToProps)(Main));