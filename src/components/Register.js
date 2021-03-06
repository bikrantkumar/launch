import React,{Component} from 'react'
import Web3 from 'web3';
import Crud from './Crud.json';
import './style.scss'
import {Loading} from './loadingComponent'

class Register extends Component {
    constructor(props){
        super(props);
        this.state ={
            username:'',
            email:'',
            password:-1,
            validatorUsername:'',
            isvalidUsername:false,
            validatorEmail:'',
            isvalidEmail:false,
            isloading:false,
            response:'',
            accounts:[]
        }
    }

    onsubmit = (event)=>{
        if( this.state.isvalidEmail === false || this.state.isvalidUsername === false){
            this.setState({response:'Please Enter Correct details to Proceed'})
        }
        else{
            this.setState({response:''})
            console.log("this is called here fine" + event);
            let web3;
            let crud;

            const initWeb3 = () => {
            return new Promise((resolve, reject) => {
                if(typeof window.ethereum !== 'undefined') {
                //const web3 = new Web3(window.ethereum);
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
            event.preventDefault();
            const name = this.state.username;
            const email = this.state.email;
            console.log("here reached")
            this.setState({isloading : true})
            crud.methods 
            .create(name,email)
            .send({from : this.state.accounts[0]})
            .then(()=> {

                crud.methods
                .nextId()
                .call()
                .then((e)=>{
                    this.setState({response: 
                        `New user with name ${name}, with ${email} created password is ${e-1}`})
                        
                })
                this.setState({isloading : false})
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
                    this.setState({response: `Successfully logged in with username ${name}`})
                    else{
                        this.setState({response: `Wrong password/email ${email}`})
                    }
                })
                .catch((e) => console.log(e))
                
            } 

            
            initWeb3()
                .then(_web3 => {
                web3 = _web3;
                crud = initContract();
                if( this.state.password === -1){
                    console.log("called success")
                initApp();
                }
                else{
                    runApp();
                }
                })
                .catch(e => console.log(e.message));
        }
    }
    adduser = event =>{
        if( event.target.value.length < 4 ){
            this.setState({validatorUsername: 'Username should be greater than 4 characters '});
            this.setState({ isvalidUsername : false});
            this.setState({username : event.target.value});
        }
        else{
            this.setState({username : event.target.value})
            this.setState({validatorUsername: ''});
            this.setState({ isvalidUsername : true})
        }
    }
    adduseremail = event =>{
        
        if((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(event.target.value)){
            this.setState({validatorEmail: ''});
            this.setState({ isvalidEmail : true});
            this.setState({email : event.target.value})
        }
        else{
            this.setState({validatorEmail: 'Enter a Valid E-mail '});
            this.setState({ isvalidEmail : false});
            this.setState({email : event.target.value});
        }
    }
    render(){
        
        if(this.state.isloading){
            return(
                <div>
                    <div >         
                    <form id="create" onSubmit ={ this.onsubmit }>
                        <div className= " form-group ">
                            <div className="row">
                            <div className="col-12 mb-5"><h1> Register </h1> </div>    
                            </div>  
                        <div >
                            <div className="row">
                                    <label htmlFor="name" className=" col-12 col-sm-4">Name</label>
                                    <input id="name" type="text" className="form-control col-12 col-sm-7" placeholder="Enter you Username"
                                        value={this.state.username} onChange={ this.adduser }
                                    />
                                    <div className="row">
                                    <div style={{color:"red"}} className="col-12 col-sm-7 mr-auto ml-auto">{this.state.validatorUsername}</div>
                                    </div>
                            </div>
                        </div>
                        <div >
                            <div className="row mt-3">
                                <label htmlFor="e-mail" className= "col-12 col-sm-4 ">E-mail</label>
                                <input id="e-mail" type="text" className="form-control col-12 col-sm-7" placeholder="Enter your E-mail"
                                    value={this.state.email} onChange={ this.adduseremail }
                                />
                                <div style={{color:"red"}} className="col-12 col-sm-8">{this.state.validatorEmail}</div>
                            </div>
                        </div>
                        </div>
                        <div className="row">
                            <button type="submit" className="btns  col-10 ml-4 mr-2">Submit</button>
                            <p id="create-result" className="col-sm-10">{this.state.response}</p>
                        </div>
                    </form>
                    
                </div>
                    <div className="container">
                        <div className="row">
                            <Loading/>
                        </div>
                    </div>
            </div>
            );
        }       
        
        return(
            
            <div >         
                <form id="create" onSubmit ={ this.onsubmit }>
                    <div className= " form-group ">
                        <div className="row">
                        <div className="col-12 mb-5"><h1> Register </h1> </div>    
                        </div>  
                    <div >
                        <div className="row">
                                <label htmlFor="name" className=" col-12 col-sm-4">Name</label>
                                <input id="name" type="text" className="form-control col-12 col-sm-8" placeholder="Enter you Username"
                                    value={this.state.username} onChange={ this.adduser }
                                />
                                <div className="row">
                                <div style={{color:"red"}} className="col-12 col-sm-8 mr-auto ml-auto">{this.state.validatorUsername}</div>
                                </div>
                        </div>
                    </div>
                    <div >
                        <div className="row mt-3">
                            <label htmlFor="e-mail" className= "col-12 col-sm-4 ">E-mail</label>
                            <input id="e-mail" type="text" className="form-control col-12 col-sm-8" placeholder="Enter your E-mail"
                                value={this.state.email} onChange={ this.adduseremail }
                            />
                            <div style={{color:"red"}} className="col-12 col-sm-8">{this.state.validatorEmail}</div>
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <button type="submit" className="btns col-10 mr-auto ml-auto">Submit</button>
                    <p id="create-result">{this.state.response}</p>
                    </div>
                </form>
                
            </div>
        )
        
    }

}
export default Register