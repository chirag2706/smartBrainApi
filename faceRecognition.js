import React from 'react';
import './App.css';
class FaceRecognition extends React.Component{
    constructor(props){
        super(props);
    }
    render = ()=>{
        if (this.props.flag === true){
            var upi = 0;
            var renderedItems = this.props.box.map((box)=>{
                upi++;
                return <div className = "facebox" style = {{left:box.leftColumn,top:box.topRow,right:box.rightColumn,bottom:box.bottomRow}} key = {upi}></div>;
            });
            
            return (
                <div style = {{display:"flex",justifyContent:"center"}}>
                    <div className = "absolute mt6 mb3">
                        <img  id = "box" src = {this.props.imageUrl}  style = {{width:"450px",height:"auto"}}/>
                        {renderedItems}
                    </div>    

                </div>
            );
        }else{
            return (
                <div style = {{display:"flex",justifyContent:"center"}}>
                    <div className = "absolute mt6 mb3">
                        <img  id = "box" src = {this.props.imageUrl}  style = {{width:"450px",height:"auto"}}/>
                    </div>    

                </div>
            );
        }
    }
}
export default FaceRecognition;