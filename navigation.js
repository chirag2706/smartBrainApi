import React from 'react';
import Logo from './logo.js';
import 'tachyons';
class Navigation extends React.Component{
    constructor(props){
        super(props);
    }
    render = ()=>{
        if (this.props.status === "home"){
            return (
                <div>
                    <div style = {{display:"flex",justifyContent:"flex-end"}}>
                        <div className = "link f3 black dim pa4 pointer" onClick = {this.props.onSignOut}>Sign Out</div>
                    </div>
                    <Logo />
                    <div style = {{display:"flex",justifyContent:"center"}}>
                        <h1 style = {{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",fontSize:"60px",marginTop:"50px",color:'rgb(253, 230, 25)'}}>HumanFace Detector</h1>
                    </div>
                </div>
            );
        }else{
            return (
                <div>
                <div style = {{display:"flex",justifyContent:"flex-end"}}>
                    <div className = "link f3 black dim pa4 pointer" onClick = {this.props.onSignOut}>Sign In</div>
                    <div className = "link f3 black dim pa4 pointer" onClick = {this.props.onRegister}>User registration</div>
                </div>
                </div>
            );
        }
    }
}
export default Navigation;