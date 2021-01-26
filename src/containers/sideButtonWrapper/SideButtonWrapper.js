import React, {useState} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import {Signin} from '../../components';
import {Signup} from '../../components';
import { drop_jwt } from '../../store/modules/JWT';
import Button from '@material-ui/core/Button';
import { drop_userLikeCompany } from "../../store/modules/UserLikeCompany";
import {COMPANYFORM, USERLIKECOMPANY_FORM, changeForm} from '../../store/modules/Form';
import StarBorderSharpIcon from '@material-ui/icons/StarBorderSharp';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

const SideButtonWrapper = () => {
    const dispatch = useDispatch();
    const [signinModalIsOpen, setSigninModalIsOpen] = useState(false);
    const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);
    const jwt = useSelector(state => state.jwt);
    const companyForm = useSelector(state => state.form)
    const isLogin = () => {
        return jwt!=null
    }

    const signinClick = () => {
        setSigninModalIsOpen(true);
    }

    const signupClick = () => {
        setSignupModalIsOpen(true);
    }

    const clickUserLikeCompany = () => {
        dispatch(changeForm(USERLIKECOMPANY_FORM))
    }

    const clickHome = () => {
        dispatch(changeForm(COMPANYFORM))
    }

    const logout = () => {
        dispatch(drop_jwt());
        dispatch(drop_userLikeCompany());
    }

    const SetSideButton = () => {
        if (isLogin()) {
            return(<div style={{position:'absolute', right:'10%', top:'5%'}}>
                {
                    companyForm === COMPANYFORM?
                        <Button
                            onClick={clickUserLikeCompany} 
                            variant="contained"
                            color="secondary"
                        >
                            <StarBorderSharpIcon/>
                        </Button>:
                        <Button
                            onClick={clickHome}
                            variant="contained"
                            color="primary"
                        >
                            <HomeOutlinedIcon/>
                        </Button>
                }
                <Button 
                    style={{marginLeft:"10px"}} 
                    color="primary" 
                    variant="contained"
                    onClick={logout}
                >
                    Logout
                </Button>
            </div>)
        } else {
            return(<div style={{position:'absolute', right:'10%', top:'5%'}}>
                <Button color="primary" onClick={signinClick}>Signin</Button>
                <Button color="primary" onClick={signupClick}>Signup</Button>
                <Signin signinModalIsOpen={signinModalIsOpen} setSigninModalIsOpen={setSigninModalIsOpen}/>
                <Signup signupModalIsOpen={signupModalIsOpen} setSignupModalIsOpen={setSignupModalIsOpen}/>
            </div>)
        }
    }

    return(
        <div>
            <SetSideButton/>
        </div>
    );
}

export default SideButtonWrapper;