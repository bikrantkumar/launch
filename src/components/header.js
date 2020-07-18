import React,{Component} from 'react'
import {Nav,Navbar,NavItem, NavbarBrand,Jumbotron,NavbarToggler,Collapse
,Modal,ModalBody,ModalHeader,Button} from 'reactstrap'

import {NavLink} from 'react-router-dom'
import Script from 'react-script-tag'
import Web3 from 'web3';
import Crud from './Crud.json';



class Header extends Component{
    
    constructor(props){

        super(props);
        this.state={
            isnavopen:false,
            ismodalopen:false,
            ismodal2open:false,
            username: '',
            email:'',
            password: -1,
            response: 'The conformation message will appear here',
            response2: 'Password conformation messaage will appear here',
            accounts:[],
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
    adduser = event =>{
        this.setState({username : event.target.value})
    }
    adduseremail = event =>{
        this.setState({email : event.target.value})
    }
    password = event =>{
        this.setState({password: event.target.value})
    }
    onsubmit = (event)=>{
        console.log("this is called here fine" + event);
        let web3;
        let crud;

        const initWeb3 = () => {
        return new Promise((resolve, reject) => {
            if(typeof window.ethereum !== 'undefined') {
            const web3 = new Web3(window.ethereum);
            window.ethereum.enable()
                .then(() => {
                resolve(
                    new Web3(window.ethereum)
                );
                })
                .catch(e => {
                reject(e);
                });
            return;
            }
            if(typeof window.web3 !== 'undefined') {
            return resolve(
                new Web3(window.web3.currentProvider)
            );
            }
            resolve(new Web3('http://localhost:9545'));
        });
        };

        const initContract = () => {
        const deploymentKey = Object.keys(Crud.networks)[0];
        return new web3.eth.Contract(
            Crud.abi, 
            Crud
            .networks[deploymentKey]
            .address
        );
        };

        const initApp = () => {
        web3.eth.getAccounts()
        .then((_accounts) =>{
            this.setState({ accounts : _accounts});
            console.log(this.state.accounts[0]);
        })
        .catch((e) =>{
            this.setState({response: `here is the error`})
        })
        //event.preventDefault();
        const name = this.state.username;
        const email = this.state.email;
        console.log(this.state.accounts[0])
        crud.methods
        .create(name,email)
        .send({from : this.state.accounts[0]})
        .then(()=> {
            crud.methods
            .nextId()
            .call()
            .then((e)=>{
                this.setState({response: 
                    `New user with name ${name}, with ${email} created password is ${e}`})
            })
        })
        .catch(()=>{
            this.setState({response: `Oops.... server error here it is `})
        });
        
        }

        const runApp = ()=>{

            const name = this.state.username;
            const email = this.state.email;

            web3.eth.getAccounts()
            .then((_accounts) =>{
                this.setState({ accounts : _accounts});
                console.log(this.state.accounts[0]);
            })
            .catch((e) =>{
                this.setState({response: `here is the error`})
            })

            crud.methods
            .read(this.state.password)
            .call()
            .then((result) =>{
                //console.log(result[0] + this.state.password);
                //console.log(result[1] + this.state.email);
                //console.log(result[2] + this.state.username);
                if( result[0] === this.state.password && result[1] === this.state.email && result[2] === this.state.username )
                this.setState({response2: `Successfully logged in with username ${this.state.username}`})
                else{
                    this.setState({response2: `Wrong password/email ${this.state.username}`})
                }
            })
            .catch((e) => console.log(e))
            
        } 

        
        initWeb3()
            .then(_web3 => {
            web3 = _web3;
            crud = initContract();
            if( this.state.password == ''){
            initApp();
            }
            else{
                runApp();
            }
            })
            .catch(e => console.log(e.message));

    }
    render(){
        return(
            <React.Fragment>
                <Navbar dark expand="md" className="navbar cd-auto-hide-header unique-color-dark">
                <div className="container-fluid ">
                    <NavbarToggler onClick={this.togglenav}/>
                   <NavbarBrand >
                   <img src="public/assets/images/logo.png" height = "50" width="50" alt="Logo" href="/"></img>
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
                            <Button outline onClick={this.togglemodal} className="btn btn-primary ml-auto fa fa-sign-in fa-lg mr-2" style={{color:"floralwhite"}}> Get Stated</Button>
                        </NavItem>
                        <NavItem>
                            <Button onClick={this.togglemodal2} className="btn btn-success ml-auto fa fa-sign-in " style={{color:"floralwhite"}}> Log In</Button>
                        </NavItem>
                    </Nav>            
                </div>  
                </Navbar>
                <Modal isOpen={this.state.ismodalopen} toggle={this.togglemodal}>
                    <ModalHeader toggle={this.togglemodal}> Get Started</ModalHeader>
                    <ModalBody>
                    <div>
                       
                        <form id="create" onSubmit ={ this.onsubmit }>
                            <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text" className="form-control"
                                value={this.state.username} onChange={ this.adduser }
                            />
                            <label htmlFor="e-mail">E-mail</label>
                            <input id="e-mail" type="text" className="form-control"
                                value={this.state.email} onChange={ this.adduseremail }
                            />

                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <p id="create-result">{this.state.response}</p>
                        </form>
                    </div>
                    
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.ismodal2open} toggle={this.togglemodal2 }>
                    <ModalHeader toggle={this.togglemodal2}> Log IN</ModalHeader>
                    <ModalBody>
                    <div>
                       
                        <form id="create" onSubmit ={ this.onsubmit }>
                            <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text" className="form-control"
                                value={this.state.username} onChange={ this.adduser }
                            />
                            <label htmlFor="e-mail">E-mail</label>
                            <input id="e-mail" type="text" className="form-control"
                                value={this.state.email} onChange={ this.adduseremail }
                            />
                            <label htmlFor="password">Password</label>
                            <input id="password" type="text" className="form-control"
                                value={ this.state.password } onChange={ this.password }
                            />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <p id="create-result">{this.state.response2}</p>
                        </form>
                    </div>
                    
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