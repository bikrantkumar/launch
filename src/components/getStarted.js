import React from 'react';
import './appstyle.scss'
import  LogIn  from "./logIn";
import Register  from "./Register";

const RightSide = props => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
      
    </div>
  );
};
class GetStarted extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true,
    };

  }

  componentDidMount() {
    //Add .right by default
    this.RightSide.classList.add("right");
  }
  changeState() {
    const  isLogginActive  = this.state.isLogginActive;

    if (isLogginActive) {
      this.RightSide.classList.remove("right");
      this.RightSide.classList.add("left");
    } else { 
      this.RightSide.classList.remove("left");
      this.RightSide.classList.add("right");
    }
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }
  render() {
    const { isLogginActive } = this.state;
    const current = isLogginActive ? "Register" : "Login";
    const currentActive = isLogginActive ? "login" : "register";
    return (
      <div className="App">
        <h1>{this.state.username}</h1>
        <div className="login">
          <div className="container" ref={ref => (this.container = ref)}>
            {isLogginActive && (
              <LogIn containerRef={ref => (this.current = ref) }  />
            )}
            {!isLogginActive && (
              <Register containerRef={ref => (this.current = ref)} />
            )}
          </div>
          
          <RightSide
          current={current}
          currentActive={currentActive}
          containerRef={ref => (this.RightSide = ref)}
          onClick={this.changeState.bind(this)}
          />
        </div>
      </div>
    );
  }
}
export default GetStarted;
