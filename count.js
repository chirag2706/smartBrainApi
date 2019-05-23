import React from 'react';
class Count extends React.Component{
    constructor(props){
        super(props);
    }
    render = ()=>{
        if (this.props.des === ""){
            return <div></div>;
            // return <div style = {{display:"flex",justifyContent:"center",fontSize:"25px"}}>Error or incorrect image url</div>;
        }else{
            if (this.props.des.status!==400){
                return (
                    <div style = {{display:"flex",justifyContent:"center",fontSize:'25px'}}>
                        {`The Number of faces detected in the below image is/are ${this.props.count}`}
                    </div>
                );
            }else{
                return (
                    <div style = {{display:"flex",justifyContent:"center",fontSize:'25px',textAlign:"center"}}>
                        {`Invalid Request, Please use another image as either no human face or picture clarity is not their.I hope U will understand`}
                    </div>
                );
            }
        }
    }
}
export default Count;