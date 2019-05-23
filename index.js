import React from 'react';
import ReactDOM from 'react-dom';
import InputUrl from './inputUrl.js';
import Rank from './rank.js';
import Clarifai from 'clarifai';
import FaceRecognition from './faceRecognition.js';
import Navigation from './navigation';
import Particles from 'react-particles-js';
import SignInForm from './signInForm';
import Register from './register.js';
import Count from './count.js';
import 'tachyons';
import './App.css';

class App extends React.Component{
    constructor(props){
        super(props);
        this.globe = 0;
        this.state = {entries:0,des : '',flag:false,route:"SignIn",count:0,input:"https://i.ytimg.com/vi/jYU53DYXokY/maxresdefault.jpg",box:[],imageUrl:"",fullname:'',email:'',password:''};
    }
    onInputChange = (event)=>{
        this.setState({input:event.target.value,imageUrl:event.target.value,flag:false,des:''});
    }

    FaceCalculation = (res)=>{
        var FaceBox;
        var newBox;
        var image  = document.querySelector("#box");
        var width = Number(image.width);
        var height = Number(image.height);
        var arr = [];
        this.globe  = res.outputs[0].data.regions.length;
        for (var i=0;i<res.outputs[0].data.regions.length;i++){
            FaceBox = res.outputs[0].data.regions[i].region_info.bounding_box;
            newBox = {
                leftColumn:FaceBox.left_col*width,
                topRow:FaceBox.top_row*height,
                rightColumn:width-(FaceBox.right_col*width),
                bottomRow:height - (FaceBox.bottom_row*height)
            };
            arr.push(newBox);
        } 
        console.log("working");
        return arr;
    }

    onDisplayBox = (box)=>{
        console.log("display");
        this.setState({box:box,imageUrl:this.state.input,flag:true});
    }

    onButtonSubmit = ()=>{
        const app = new Clarifai.App({apiKey: '6c3cee90bbac4dba845a4dfa4eef2dcd'});
            
        
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.imageUrl)
        .then( (response) => {
            console.log('response is:');
            console.log(response);
            var url2 = "http://localhost:3002/image";
            fetch(url2,{
                method:"post",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({
                    email:this.state.email
                })
            }).then((res)=>{
                return res.json();
            }).then((data)=>{
                this.setState({entries:data.Entries});
            }).catch((err)=>{
                console.log("error in solving issues");
                console.log(err);
            });
            this.setState({des:response});
            this.onDisplayBox(this.FaceCalculation(response));
            
        })
        .catch((err) => {
            console.log("error");
            console.log(err);
            this.setState({des:err});
        });
    }

    onSignIn = (event)=>{
        this.setState({route:"home",imageUrl:'',des:'',entries:event.Entries});
    }
    onSignOut = ()=>{
        this.setState({route:"SignIn"});
    }
    onRegister = ()=>{
        this.setState({route:"register",entries:0});
    }
    onUser = (event)=>{
        this.setState({fullname:event.fullname,email:event.email,password:event.password});
    }

    render = ()=>{
        var particle = {
            particles: {
                number:{
                    value:100,
                    density:{
                        enable:true,
                        value_area:1000
                    }
                }
            }
        }
            if (this.state.route === "home"){
                return (
                    <div>
                        <Particles className="particle" params={particle}/>
                        <Navigation onSignOut = {this.onSignOut} status = {this.state.route}/>
                        <Rank currentUserInfo = {this.state}/>
                        <InputUrl onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}  />
                        <FaceRecognition imageUrl = {this.state.imageUrl} box = {this.state.box} flag = {this.state.flag}/>
                        <div style = {{marginTop:"20px"}}>
                            <Count count = {this.globe} des = {this.state.des}/>
                        </div>
                    </div>
                );
            }else{
                if (this.state.route === "register"){
                    return (
                    <div>
                        <Particles className="particle" params={particle}/>
                        <Navigation onSignOut = {this.onSignOut} status = {this.state.route} onRegister = {this.onRegister}/>
                        <Register onSignIn = {this.onSignIn} onRegister = {this.onRegister} onUser = {this.onUser}/>
                    </div>
                    );
                }else{
                    return (
                        <div>
                            <Particles className="particle" params={particle}/>
                            <Navigation onSignOut = {this.onSignOut} status = {this.state.route} onRegister = {this.onRegister}/>
                            <SignInForm onSignIn = {this.onSignIn} onRegister = {this.onRegister} onUser = {this.onUser}/>
                        </div>
                    );
                }
            }
    }
}
ReactDOM.render(<App />,document.querySelector("#root"));