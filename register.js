import React from 'react';
class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {fullname:'',email:'',password:''};
    }
    onSubmitSignIn = ()=>{
      var url1 = "http://localhost:3002/register";
      fetch(url1,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          fullname:this.state.fullname,
          email:this.state.email,
          password:this.state.password
        })
      })
        .then((response)=>{
          // console.log(response);
        return response.json()
      })
      .then((data)=>{
        // console.log()
        console.log(data);
        if (data !== "failure"){
          this.props.onSignIn(data);
          this.props.onUser({
            fullname:this.state.fullname,
            email:this.state.email,
            password:this.state.password,
          });
        }else{
          console.log("On register");
          this.props.onRegister();
        }
      })
      .catch((err)=>{
        console.log("error");
        console.log(err);
        this.props.onRegister();
      })
    }
    onPasswordChange = (event)=>{
      this.setState({
        password:event.target.value
      });
    }

    onEmailChange = (event)=>{
      this.setState({
        email:event.target.value
      });
    }

    onNameChange = (e)=>{
      this.setState({
        fullname:e.target.value
      });
    }
    render = ()=>{
        return (
            <div style = {{display:"flex",justifyContent:"center",marginTop:"80px",marginLeft:"38%",marginRight:"38%"}} className = "shadow-1">
            <main className="pa4 black-80">
            <div className="measure center">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0" style = {{textAlign:"center",fontSize:"30px"}}>Register</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">FullName</label>
                  <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="email-address1" placeholder = "Full Name" onChange = {this.onNameChange} required/>
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" placeholder = "E-mail iD" onChange = {this.onEmailChange} required/>
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" placeholder = "Password" onChange = {this.onPasswordChange} required/>
                </div>
                <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
              </fieldset>
              <div style = {{display:"flex",justifyContent:"center"}}>
                <input onClick = {this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
              </div>
            </div>
          </main>
            </div>
        );
    }
}
export default Register;