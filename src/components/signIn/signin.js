import React from "react";
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { BASE_URL } from '../../App';
import { useDispatch } from "react-redux";
import { change_jwt } from "../../store/modules/JWT";
import { set_userLikeCompany } from "../../store/modules/UserLikeCompany";
import "../../index.css"
import { Grid } from "@material-ui/core";
const Signin = props => {

    const dispatch = useDispatch()

    const getUserLikeCompany = jwt => {
        axios.get(BASE_URL+"user/get_like_company",{
            headers:{
                "X-AUTH-TOKEN": jwt
            }
        }).then(response => {
            dispatch(set_userLikeCompany(response.data));
        }).catch(error => {
            console.log(error);
            alert("오류발생");
        })
    }

    const signin = () => {
        axios.post(BASE_URL + "user/login",{
            "userName": document.getElementsByName("username")[0].value,
            "password": document.getElementsByName("password")[0].value
        }).then(response => {
            const jwt = response.data;
            dispatch(change_jwt(jwt));
            getUserLikeCompany(jwt);
        }).catch(error => {
            try{
                if (error.response.status === 405)
                    alert("좋지 못한 입력값");
                else if (error.response.status === 403)
                    alert("아이디 혹은 패스워드가 틀림");
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
            <center>
                <form className="user_modal_form">
                    <h1>Sign in</h1>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField id="standard-basic" fullWidth label="UserName" name="userName" />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                        fullWidth
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        name="Password"
                        autoComplete="current-password"
                        />
                        </Grid>
                        <Button style={{margin:"10px auto"}} size="large" variant="contained" color="primary" onClick={signin}>Signin</Button>
                    </Grid>
                </form>
            </center>
        </Modal>
    );
}

export default Signin;