import React, {useState} from "react";
import { useSelector } from "react-redux";
import {Signin} from '../../components';
import {Signup} from '../../components';
import Button from '@material-ui/core/Button';

const SideButtonWrapper = () => {
    const [signinModalIsOpen, setSigninModalIsOpen] = useState(false);
    const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);
    const jwt = useSelector(state => state.jwt);

    const isLogin = () => {
        return jwt!=null
    }

    const signinClick = () => {
        setSigninModalIsOpen(true);
    }

    const signupClick = () => {
        setSignupModalIsOpen(true);
    }

    const SetSideButton = () => {
        if (isLogin()) {
            return(<div>

            </div>)
        } else {
            return(<div>
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