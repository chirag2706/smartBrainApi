import React from 'react';
import Tilt from 'react-tilt';
import 'tachyons';
class Logo extends React.Component{
    constructor(props){
        super(props);
    }
    render = ()=>{
        return (
            <div className = "ma4 mt0" >
                <Tilt className="Tilt shadow-2" options={{ max : 90 }} style={{ height: 100, width: 150 }} >
                    <div className="Tilt-inner" style = {{width:190,height:"auto"}}>
                        <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYV892IxKNoCxUL0TU_eGezdhobY5R2CahgZKFGXm72U1dpGRt" alt = "Your brain can take rest for some time"/>
                    </div>
                </Tilt>
            </div>
        );
    }
}
export default Logo;