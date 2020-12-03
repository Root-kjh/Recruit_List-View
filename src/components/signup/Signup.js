import React from "react";
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import BASE_URL from '../../App';

const Signup = props => {

    const signup = () => {
        const password=document.getElementsByName("password")[1];
        const passwordR=document.getElementsByName("passwordR")[0];
        if(password.value===passwordR.value){
            axios.post(BASE_URL+"user/signup",{
                email: document.getElementsByName("Email")[0].value,
                userName : document.getElementsByName("username")[1].value,
                password : password.value
        }).then( () => {
            alert("회원가입 성공");
        }).catch(error => {
            if (error.response.status===406)
                alert("이미 존재하는 유저");
            else if (error.response.status===405)
                alert("좋지 못한 입력값");
        });
        }
    
    }

    const handleClose = () => {
        props.setSignupModalIsOpen(false);
    }

    return(
        <Modal 
        id="signupModal"
        open={props.signupModalIsOpen}
        onClose={handleClose}    
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        >
            <form>
                <h1>Sign up</h1>
                <TextField id="standard-basic" label="UserName" name="userName" />
                <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                name="Password"
                autoComplete="current-password"
                />
                <Button variant="contained" onClick={signup}>Signup</Button>
            </form>
        </Modal>
    );
};

export default Signup;