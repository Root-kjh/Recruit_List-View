import React from "react";
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import cookie from 'react-cookies'

const crypto = require('crypto')

const useStyles = {
    root:{
        margin: '10px',
        alignItems:'center'
    },
    TextField:{
        margin: '8px'
    },
    Form: {
        width: '700px',
        border: 'solid 1px #115293',
        borderRadius: '8px',
        margin: '100px auto'
    },
    Checkbox: {
        marginTop: '15px'
    },
    title: {
        color: '#3f51b5',
        textAlign: 'center'
    }
};

class SignIn extends React.Component{

    constructor(props){
        super(props);
        this.signin=this.signin.bind(this);
        this.signup=this.signup.bind(this);
        this.encodePW=this.encodePW.bind(this);
        this.state={
            signin:{
                username:false,
                password:false
            },
            signup:{
                password:false,
                passwordR:false
            }
        };
    }

    encodePW(password){
        return crypto.createHash('sha512').update(crypto.createHash('sha512').update(password).digest('hex')).digest('hex');
    }

    signin(){
        axios.post("http://localhost:8080/user/login",{
            username : document.getElementsByName("username")[0].value,
            password : this.encodePW(document.getElementsByName("password")[0].value),
        }).then(Response=>{
            if(Response.data===false)
                this.setState({
                    signin:{
                        username:true,
                        password:true
                    }
                });
            else{
                cookie.save('jwt',Response.data,{maxAge:600});
                window.location.reload();
            }
        });
    }

    signup(){
        const password=document.getElementsByName("password")[1];
        const passwordR=document.getElementsByName("passwordR")[0];
        if(password.value===passwordR.value){
            axios.post("http://127.0.0.1:8080/user/signup",{
                username : document.getElementsByName("username")[1].value,
                password : this.encodePW(password.value),
                email: document.getElementsByName("Email")[0].value
        }).then(Response=>{
            if(Response.data===true)
                alert("회원가입 성공");
            else
                alert("회원가입 실패");
        });
        }else{
            this.setState({
                signup:{    
                    password:true,
                    passwordR:true
                }
            });
        }

    }

    render(){
        const {classes} = this.props;
        return(
            <div className={classes.root}>
                <div className={classes.Form}>
                <h1 className={classes.title}>SIGN IN</h1>
                <TextField required className={classes.TextField} style={{marginLeft:"125px"}} name="username" label="Required" label="ID" error={this.state.signin.username}/>
                <TextField required className={classes.TextField} type="password" name="password" label="Required" label="Password" error={this.state.signin.password}/>
                <Button variant="contained" style={{marginTop:"15px"}} color="primary" onClick={this.signin}>
                    SIGN IN
                </Button>
                </div>
                <div className={classes.Form}>
                <h1 className={classes.title}>SIGN UP</h1>
                <form>


                    
                <TextField required className={classes.TextField} style={{marginLeft:"125px"}} name="username" label="Required" label="ID" />
                <TextField required className={classes.TextField} type="email" name="Email" label="Required" label="Email" />
                <TextField required className={classes.TextField} style={{marginLeft:"125px"}} type="password" name="password" label="Required" label="Password" error={this.state.signup.password}/>
                <TextField required className={classes.TextField} type="password" name="passwordR" label="Required" label="Password Retry"  error={this.state.signup.passwordR}/><br/>
                <Button variant="contained" style={{marginTop:"15px",marginLeft:"300px"}} color="primary" onClick={this.signup}>
                    SIGN UP
                </Button>
                </form>
                </div>
            </div>
        )
    };
}

export default withStyles(useStyles)(SignIn);