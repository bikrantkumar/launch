import React,{Component} from 'react'
import {Nav,Navbar,NavItem, NavbarBrand,Jumbotron,NavbarToggler,Collapse
,Modal,ModalBody,ModalHeader,Button,Form,Input, Label, FormGroup} from 'reactstrap'

import {NavLink} from 'react-router-dom'



class Header extends Component{
    
    constructor(props){

        super(props);
        this.state={
            isnavopen:false,
            ismodalopen:false
        };
        this.togglenav=this.togglenav.bind(this)
        this.togglemodal=this.togglemodal.bind(this)
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
    render(){
        return(
            <React.Fragment>
                <Navbar dark expand="md" className="navbar cd-auto-hide-header unique-color-dark">
                <div className="container-fluid ">
                    <NavbarToggler onClick={this.togglenav}/>
                   <NavbarBrand >
                   <img src="../assets/images/logo.png" height = "50" width="50" alt="Logo" href="/"></img>
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
                    </Collapse>
                    <Nav navbar  >
                        <NavItem>
                            <Button outline onClick={this.togglemodal} className="btn btn-primary ml-auto fa fa-sign-in fa-lg" style={{color:"floralwhite"}}> Log In</Button>
                        </NavItem>
                    </Nav>            
                </div>  
                </Navbar>
                <Modal isOpen={this.state.ismodalopen} toggle={this.togglemodal}>
                    <ModalHeader toggle={this.togglemodal}> Log IN</ModalHeader>
                    <ModalBody>
                    <Form >
                            <FormGroup>
                                <Label htmlFor="username" >Username</Label>
                                <Input id="username" type="text" placeholder="Username"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password" >Password</Label>
                                <Input id="password" type="password" placeholder="Password"
                                />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                    />Remember me
                                </Label>
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </FormGroup>
                    </Form>
                    </ModalBody>
                </Modal>
                <Jumbotron>
                    <div className="container-fluid">
                        <div className="row row-header">
                            <div className="col-12  text-center ">
                                
                                <h1 className="heading">SafeHive</h1>
                                <p>Let us be a bee </p>
                            </div>
                            <div className="col-12  text-center centerimg mt-auto">
                            <img src="../assets/images/logo.png" height = "200" width="350" alt="Logo" className="img-fluid"></img>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </React.Fragment>
        )
    }
}
export default Header