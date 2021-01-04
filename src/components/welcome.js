import React, {Component} from 'react'
class Welcome extends Component {
    constructor(props){
        super(props);
        this.state ={
            username:this.props.name,
        }
    }
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
}
export default Welcome