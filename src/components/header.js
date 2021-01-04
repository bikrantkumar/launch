import React,{Component} from 'react'
import {Nav,Navbar,NavItem, NavbarBrand,Jumbotron,NavbarToggler,Collapse
,Modal,ModalBody,ModalHeader,Button} from 'reactstrap'

import {NavLink} from 'react-router-dom'
import Web3 from 'web3';
import Crud from './Crud.json';
import Register from './Register'
import LogIn from './logIn';
import GetStarted from './getStarted';
import './style.scss';
import loginImg from './login.svg'



class Header extends Component{
    
    constructor(props){

        super(props);
        this.state={
            isnavopen:false,
            ismodalopen:false,
            ismodal2open:false,
            
        };
        this.togglenav=this.togglenav.bind(this)
        this.togglemodal=this.togglemodal.bind(this)
        this.togglemodal2 = this.togglemodal2.bind(this)
        
    }

    togglenav(){
        this.setState({
            isnavopen:!this.state.isnavopen
        });
    }
    togglemodal(){
        this.setState({
            ismodalopen:!this.state.ismodalopen
        })
    }
    togglemodal2(){
        this.setState({
            ismodal2open:!this.state.ismodal2open
        })
    }
    render(){
        return(
            <React.Fragment>
                <Navbar dark expand="md" className="navbar cd-auto-hide-header unique-color-dark">
                <div className="container-fluid ">
                    <NavbarToggler onClick={this.togglenav}/>
                   <NavbarBrand >
                   <img src="assets/images/logo.png" height = "50" width="50" alt="Logo" href="/"></img>
                   </NavbarBrand>
                   <Collapse isOpen={this.state.isnavopen} navbar>
                   <Nav navbar >
                       
                        <NavItem>
                            <NavLink className="nav-link  " to="/home" ><span className="fa fa-home fa-lg " ></span> Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                        </NavItem>
                    </Nav>
                    
                    <Nav navbar className="ml-auto" >
                        <NavItem>
                            <Button outline onClick={this.togglemodal} className="btn btn-primary ml-auto fa fa-sign-in fa-lg mr-2 btn btn-magick btn-lg btn3d" style={{color:"floralwhite"}}> Get Stated</Button>
                        </NavItem>
                        {/*
                        <NavItem>
                            <Button onClick={this.togglemodal2} className="btn btn-success ml-auto fa fa-sign-in btn btn-primary btn-lg btn3d " style={{color:"floralwhite"}}> Log In</Button>
                        </NavItem>
                        */}
                    </Nav>   
                    </Collapse>         
                </div>  
                </Navbar>
                <Modal isOpen={this.state.ismodalopen} toggle={this.togglemodal}>
                    <ModalHeader toggle={this.togglemodal} className ="header"> Welcome to SafeHive </ModalHeader>
                    <ModalBody>
                    <div className="base-container" ref={this.props.containerRef}>
                        <div className="content">
                        <div className="image">
                            <img src={loginImg} alt="this" />
                        </div>
                            <GetStarted />
                        </div>
                    </div>
                    
                    
                    </ModalBody>
                </Modal>
                {/*
                <Modal isOpen={this.state.ismodal2open} toggle={this.togglemodal2 }>
                    <ModalHeader toggle={this.togglemodal2}> Log IN </ModalHeader>
                    <ModalBody>
                        <LogIn/>
                    
                    </ModalBody>
                </Modal>
                */}
                <Jumbotron>
                    <div className="container-fluid">
                        <div className="row row-header">
                            <div className="col-12  text-center ">
                                
                                <h1 className="heading">SafeHive</h1>
                                <p>Let us be a bee </p>
                            </div>
                            <div className="col-12  text-center centerimg mt-auto">
                            <img src="assets/images/logo.png" height = "200" width="350" alt="Logo" className="img-fluid"></img>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </React.Fragment>
        )
    }
}
export default Header