import React,{Component} from 'react'
import {Card,CardBody,CardHeader } from 'reactstrap'
import {FadeTransform} from 'react-animation-components'
import Web3 from 'web3';
import Crud from './Crud.json';
import Nmiq from './nmiq'


function Greeting(props) {
    if (props.mining  ) {
        const hashes=[]
        if(props.mining){
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            for( let count=0; count<10; count++){
            fetch(proxyurl+"https://safecoinserver.herokuapp.com/mine_block")
            .then(response => response.json())
            .then(
                (res) => {
                    //console.log(res)
                    hashes.push(res)
                },
                
            )
            .catch((error) => {
                //alert('error')
                })
            }
        } 
        //console.log(hashes)
        const list = (hashes)=>{
            return <ul>
            {hashes.map(item => (
                <li key={item.prev_hash}>{item}</li>
            ))}
            </ul>
        }
      return (
       <div>
           {console.log(hashes)}
        <h1> Mining</h1>
        <h1>Username : {props.name}</h1>
        <h1>email : {props.email}</h1>
        <h1>logged : {props.logged? "True":"false"}</h1>
        <h1>balance: {props.balance}</h1>
        <h1>Rounds: {props.rounds}</h1>
        <h1>prev_hashes: {hashes['index']}</h1>
        {list}
        </div>
        );
    }
    return <h1>Congratulations for Mining Please Update your balace </h1>;
  }
class Home extends Component{
    
    constructor(props){
        super(props)
        this.state={
            mining: false,
            username:'',
            email:'',
            password: null,
            logged: false,
            validatorUsername:'',
            isvalidUsername:false,
            validatorEmail:'',
            isvalidEmail:false,
            response:'',
            rounds:1,
            accounts:[],
            update_balance_response:'not updated',
            balance:0,
            target:10
        }
    }

    
    
    onsubmitupdatebalance = (event)=>{
        if( this.state.isvalidEmail == false || this.state.isvalidUsername == false){
            this.setState({response:'Please Enter Correct details to Proceed'})
        }
        else{
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
            const runApp = ()=>{
                web3.eth.getAccounts()
                .then((_accounts) =>{
                    this.setState({ accounts : _accounts});
                    console.log(this.state.accounts[0]);
                })
                .catch((e) =>{
                    this.setState({response: `here is the error`})
                })

                crud.methods
                .update_balance(this.state.password, this.state.rounds*10)
                .send({from:this.state.accounts[0]})
                .then((result) =>{
                    this.setState({update_balance_response:"Balance updated"})
                })
                .catch((e) =>this.setState({update_balance_response:"Balance updation error"}))
                
            } 
            initWeb3()
                .then(_web3 => {
                web3 = _web3;
                crud = initContract();
                runApp();
                })
                .catch(e => console.log(e.message));
            }

    }
    onsubmit = (event)=>{
        if( this.state.isvalidEmail == false || this.state.isvalidUsername == false){
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

            const runApp = ()=>{
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
                    if( result[0] === this.state.password && result[1] === this.state.email && result[2] === this.state.username )
                    this.setState({response: `Successfully logged in with username ${this.state.username}`,
                logged:true, balance:parseInt(result[3])})
                    else{
                        this.setState({response: `Wrong password/email ${this.state.username}`})
                    }
                })
                .catch((e) => console.log(e))
                
            } 

            
            initWeb3()
                .then(_web3 => {
                web3 = _web3;
                crud = initContract();
                runApp();
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
        
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)){
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
    password = event =>{
        this.setState({password: event.target.value});
    }
      
    render(){
        return(
            <React.Fragment>
           
            <div className="container"> 
                <div className="row">
                    <h3>Safehive </h3>
                    <p>The project focuses on the concept of renting computational power which can be used for
                        mining cryptocurrencies in a secure, legal, and trustable manner. As with the growth of
                        computer hardware technology, high computational power is getting more and more
                        accessible to the masses who are unable to utilize and unveil it’s true potential
                        </p>
                </div>
                <FadeTransform in
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>
                <div className="row justify-content-center">
                    
                    <Card className="col-12 col-md-4 m-2 justify-content-center ">
                        <CardHeader className="bg-primary text-white ">
                            <h3>Step-1</h3>
                        </CardHeader>
                        <CardBody>
                            <p>Make a Account on Ethereum using metamask or any other application </p>
                        </CardBody>
                    </Card>
                    <Card className="col-12 col-md-4 m-2 justify-content-center  ">
                        <CardHeader className="bg-primary text-white">
                            <h3>Step-2</h3>
                        </CardHeader>
                        <CardBody>
                            <p>Make a account on safehive </p>
                        </CardBody>
                    </Card>
                    <Card className="col-12 col-md-4 m-2 justify-content-center ">
                        <CardHeader className="bg-primary text-white" >
                            <h3>Step-3</h3>
                        </CardHeader>
                        <CardBody>
                            <p>Join our mining pool link it with safe hive account</p>
                        </CardBody>
                    </Card>
                    <Card className="col-12 justify-content-center col-md-4 m-2 ">
                        <CardHeader className="bg-primary text-white">
                            <h3>Step-4</h3>
                        </CardHeader >
                        <CardBody>
                            <p>Start mining on the move</p>
                        </CardBody>
                    </Card>

                    <form id="create" onSubmit ={ this.onsubmit } className="col-12">
                        <div className="form-group">
                        <div className="row">
                            <label htmlFor="name" className="col-12 col-sm-3 mr-1 ">Name</label>
                            <input id="name" type="text" className="form-control col-12 col-sm-7" placeholder="User-name"
                                value={this.state.username} onChange={ this.adduser } 
                            />
                            <div style={{color:"red"}} className="col-10">{this.state.validatorUsername}</div>
                        </div>
                        <div className="row mt-3" >
                            <label htmlFor="e-mail" className="col-12 col-sm-3 mr-1">E-mail</label>
                            <input id="e-mail" type="text" className="form-control col-12 col-sm-7" placeholder='Enter your E-mail'
                                value={this.state.email} onChange={ this.adduseremail }
                            />
                            <div style={{color:"red"}} className="col-10">{this.state.validatorEmail}</div>
                        </div>
                        <div className="row mt-3 mb-3" >
                            <label htmlFor="password" className="col-12 col-sm-4 mr-1">Password</label>
                            <input id="password" type="password" className="form-control col-12 col-sm-6" placeholder="password"
                                value={ this.state.password } onChange={ this.password }
                            />
                        </div>
                        </div>
                        <div className="row">
                        <button type="submit" className="btns  col-10 ml-1">Submit</button>
                        <p id="create-result" className="col-sm-10">{this.state.response}</p>
                        </div>
                    </form>

                    <button className="btn btn-primary" onClick= {this.onsubmit}>Check Balance</button>
                    <h1>{this.state.balance}</h1>
                    <button className="btn btn-primary" onClick={this.onsubmitupdatebalance}>Update Balance</button>
                    <h1>{this.state.update_balance_response}</h1>

                    <button className=" btn btn-primary miner col-12 mb-5 mt-5 justify-content-center" onClick ={ ()=>{
                        this.setState({ mining : true})
                    }} >Start Mining </button>
                    <Greeting mining={this.state.mining} name={ this.state.username} email={this.state.email}
                    password= {this.state.password} logged = {this.state.logged} balance={ this.state.balance}
                    rounds={this.state.rounds} target={ this.state.target }/>
                    <button className=" btn btn-danger miner col-12 mb-5 mt-5 justify-content-center" onClick ={ ()=>{
                        this.setState({ mining : false})
                    }} >Stop Mining </button>
                </div>
                </FadeTransform>
                
            </div>
            </React.Fragment>
        );
    }
}
export default Home 