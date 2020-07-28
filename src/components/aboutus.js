import React ,{Component} from 'react' 
import {Card,CardHeader,CardBody,BreadcrumbItem,Breadcrumb} from 'reactstrap'
import {Link} from 'react-router-dom'
class Aboutus extends Component{
    

    render(){
        return(
            <div className="container">
                <div className="mt-0">
                        <Breadcrumb >
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>About us</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                <div className="row pb-5">
                    
                    <div className="col-12 col-sm-6">
                        <h3>Aboutus</h3>
                        <p >This is a project, this website is the base of our main project The project focuses on the concept of renting computational power which can be used for
                            mining cryptocurrencies in a secure, legal, and trustable manner. As with the growth of
                            computer hardware technology, high computational power is getting more and more
                            accessible to the masses who are unable to utilize and unveil it’s true potential
                            Our project differs from the existing model of crypto-jacking as most of the efforts in the
                            past have been unsuccessful due to lack to either consent or misuse of API most famously
                            done by Coinhive.In our project, we are going to save the users data of hashes, power
                            consumption, and other important data into a blockchain directly so that even if someone
                            tries to inject our mining code into someone’s else website, their data would be stored in
                            a blockchain and hence trackable
                            As the user would serve our website or those websites which intend to use our services
                            as an alternative to Ad services offered by Google or any other ad services platform for
                            revenue generation, will rely on their user’s computational power to generate
                            cryptocurrencies, most preferably monero. As the project intends to broaden, it’s range to
                            make it compatible with almost any other cryptocurrency in order to make it a viable
                            option.
                        </p>
                    </div>
                    <div className="col-12 col-sm-6">
                        <Card>
                            <CardHeader className="bg-primary">
                                <div style={{ color: "#fffaf0"}  } >At a Glance</div>
                            </CardHeader>
                            <CardBody>
                                <dl className="row p-1 m-1">
                                    <dt className="col-sm-6">Project Start</dt>
                                    <dd className="col-sm-6">Feb,2020</dd>
                                    <dt className="col-sm-6">Project End </dt>
                                    <dd className="col-sm-6">Mar,2021</dd>
                                    <dt className="col-sm-6">CPG NO. </dt>
                                    <dd className="col-sm-6">23</dd>
                                    <dt className="col-sm-6">Mentor</dt>
                                    <dd className="col-sm-6">Dr. Rajesh Mehta,<br/> Proffesor Computer Science,<br/> Thapar University</dd>
                                </dl>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}
export default Aboutus