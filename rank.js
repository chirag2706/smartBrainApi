import React from 'react';

class Rank extends React.Component{
    constructor(props){
        super(props);
    }
    render = ()=>{
        return (
            <div>
                <div className  = "white f3" style = {{textAlign:"center",color:"black"}}>
                    {`Hello ${this.props.currentUserInfo.fullname}, your Current Rank is ${this.props.currentUserInfo.entries}`}
                </div>
            </div>
        );
    }
}
export default Rank;