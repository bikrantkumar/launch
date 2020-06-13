import React,{Component} from 'react'
import {Card,CardBody,CardHeader } from 'reactstrap'
import {FadeTransform} from 'react-animation-components'

class Home extends Component{
    render(){
        return(
            <div className="container-fluid"> 
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
                    
                    <Card className="col-4 m-2 ml-5">
                        <CardHeader className="bg-primary text-white">
                            <h3>Step-1</h3>
                        </CardHeader>
                        <CardBody>
                            <p>Make a Account on Safehive</p>
                        </CardBody>
                    </Card>
                    <Card className="col-4 m-2 ">
                        <CardHeader className="bg-primary text-white">
                            <h3>Step-2</h3>
                        </CardHeader>
                        <CardBody>
                            <p>Choose your currency</p>
                        </CardBody>
                    </Card>
                    <Card className="col-4 m-2 ml-5">
                        <CardHeader className="bg-primary text-white" >
                            <h3>Step-3</h3>
                        </CardHeader>
                        <CardBody>
                            <p>Make a Account on your currency and link it with safe hive account</p>
                        </CardBody>
                    </Card>
                    <Card className="col-4 m-2 ">
                        <CardHeader className="bg-primary text-white">
                            <h3>Step-4</h3>
                        </CardHeader >
                        <CardBody>
                            <p>Start mining on the move</p>
                        </CardBody>
                    </Card>
                </div>
                </FadeTransform>
            </div>
        );
    }
}
export default Home 