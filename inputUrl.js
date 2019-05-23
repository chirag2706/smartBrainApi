import React from 'react';
import 'tachyons';
class InputUrl extends React.Component{
    constructor(props){
        super(props);
    }
    render = ()=>{
        return (
            <div>
                <p className = "f3" style = {{textAlign:"center"}}>
                    {`This magic brain will count how many human faces are there in the image.Please give it a try.`}
                </p>
                <div className = "pa4 br3 shadow-1" style = {{marginLeft:'17%',marginRight:'17%'}}>
                    <input placeholder = "Please enter an image url" className = "f4 pa2 w-70 center" type = "text" onChange = {this.props.onInputChange} style = {{backgroundColor:"black",columnRuleColor:"red",color:"white"}}/>
                    <button className = "f4 w-30 link grow ph3 pv2 dib white bg-green" onClick = {this.props.onButtonSubmit}>Detect</button>
                </div>
            </div>
        );
    }
}
export default InputUrl;