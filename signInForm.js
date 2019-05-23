import React from 'react';
class SignInForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {signInEmail:'',signInPassword:''};
    }
    onEmailChange = (event)=>{
      this.setState({signInEmail:event.target.value});
    }
    onPasswordChange = (event)=>{
      this.setState({signInPassword:event.target.value});
    }

    onSubmitSignIn = ()=>{
      var url = "http://localhost:3002/signin";
      fetch(url,{
        method:"post",
        headers:{'Content-Type':"application/json"},
        body: JSON.stringify({
          email:this.state.signInEmail,
          password:this.state.signInPassword
        })
      })
      .then((response)=>{
        console.log(response);
        if (response.status === 200){
          return response.json();
        }else{
          return 0;
        }
      })
      .then((data)=>{
        if (data!==0){
          this.props.onUser({
            email:data.Email,
            password:data.Password,
            fullname:data.fullName
          });
          this.props.onSignIn(data);
        }else{
          this.props.onRegister();
        }
      })
      .catch((err)=>{
        console.log(err);
        this.props.onRegister();
      })
      
    }

    render = ()=>{
        return (
            <div style = {{display:"flex",justifyContent:"center",marginTop:"80px",marginLeft:"38%",marginRight:"38%"}} className = "shadow-1">
            <main className="pa4 black-80">
            <div className="measure center">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0" style = {{textAlign:"center",fontSize:"30px"}}>Sign In</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input onChange = {this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" placeholder = "E-mail iD" required/>
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input onChange = {this.onPasswordChange} required className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" placeholder = "Password"/>
                </div>
                <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
              </fieldset>
              <div style = {{display:"flex",justifyContent:"center"}}>
                <input onClick = {this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
              </div>
              <div style = {{display:"flex",justifyContent:"center"}} className="lh-copy mt3">
                <input onClick = {this.props.onRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="User Registration"/>
              </div>
            </div>
          </main>
            </div>
        );
    }
}
export default SignInForm;