import React from "react";
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import BASE_URL from '../../App';
import { useDispatch } from "react-redux";
import { change_jwt } from "../../store/modules/JWT";

const Signin = props => {

    const dispatch = useDispatch()

    const signin = () => {
        axios.post(BASE_URL+"user/login",{
            userName : document.getElementsByName("username")[0].value,
            password : document.getElementsByName("password")[0].value,
        }).then(response=>{
            const jwt = response.data;
            dispatch(change_jwt(jwt));
        }).catch(error => {
            try{
                if (error.response.status === 405)
                    alert("좋지 못한 입력값");
                else if (error.response.status === 403)
                    alert("아이디 혹은 패스워드가 틀림")
            } catch {

            }
        });
    }

    const handleClose = () => {
        props.setSigninModalIsOpen(false);
    }

    return(
        <Modal 
        id="signinModal"
        open={props.signinModalIsOpen}
        onClose={handleClose}    
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        >
            <form>
                <h1>Sign in</h1>
                <TextField id="standard-basic" label="UserName" name="userName" />
                <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                name="Password"
                autoComplete="current-password"
                />
                <Button variant="contained" onClick={signin}>Signin</Button>
            </form>
        </Modal>
    );
}

export default Signin;