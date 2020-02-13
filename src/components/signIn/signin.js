import React from "react";
import axios from 'axios';

class SignIn extends React.Component{
    
    login(){
        axios.post("http://localhost:8080/user/login",{
            username : document.getElementsByName("username")[0].value,
            password : document.getElementsByName("password")[0].value
    }).then(Response=>{console.log(Response);});
    }

    render(){
        return(
            <div>
                id<input type="text" name="username"/>
                pw<input type="password" name="password"/>
                <button onClick={this.login}>Login</button>
            </div>
        )
    };
}

export default SignIn;