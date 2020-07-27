import React,{Component} from 'react'
import Web3 from 'web3';
import Crud from './Crud.json';


class LogIn extends Component {
    constructor(props){
        super(props);
        this.state ={
            username:'',
            email:'',
            password:-2,
            response:'',
            accounts:[]
        }
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
                    `New user with name ${name}, with ${email} created password is ${e-1}`})
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
            if( this.state.password == -1){
                console.log("called succes")
            initApp();
            }
            else{
                runApp();
            }
            })
            .catch(e => console.log(e.message));

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
    render(){
        return(
            <div>
                    <div className="row">
                        <div className="col-12 mb-5"><h1> Log In </h1> </div>    
                    </div>      
                <form id="create" onSubmit ={ this.onsubmit }>
                    <div className="form-group">
                    <div className="row">
                        <label htmlFor="name" className="col-12 col-sm-4 ">Name</label>
                        <input id="name" type="text" className="form-control col-12 col-sm-8"
                            value={this.state.username} onChange={ this.adduser }
                        />
                    </div>
                    <div className="row mt-3" >
                        <label htmlFor="e-mail" className="col-12 col-sm-4 ">E-mail</label>
                        <input id="e-mail" type="text" className="form-control col-12 col-sm-8"
                            value={this.state.email} onChange={ this.adduseremail }
                        />
                    </div>
                    <div className="row mt-3 mb-3" >
                        <label htmlFor="password" className="col-12 col-sm-4 ">Password</label>
                        <input id="password" type="text" className="form-control col-12 col-sm-8"
                            value={ this.state.password } onChange={ this.password }
                        />
                    </div>
                    </div>
                    <button type="submit" className="btn  col-12">Submit</button>
                    <p id="create-result">{this.state.response2}</p>
                </form>
            </div>
        )
    }

}
export default LogIn