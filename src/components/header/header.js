import React,{ useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { drop_jwt } from '../../store/modules/JWT';
import { changeForm } from '../../store/modules/Form';
import Signin from "../Signin/Signin";
import Signup from "../signup/Signup";
import { drop_userLikeCompany } from "../../store/modules/UserLikeCompany";

const Header = () => {
    const dispatch = useDispatch();
    const [TabsValue, SetTabsValue] = useState(0);
    const [signinModalIsOpen, setSigninModalIsOpen] = useState(false);
    const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);
    const logout = () => {
        dispatch(drop_jwt());
        dispatch(drop_userLikeCompany());
    }

    const signinClick = () => {
        setSigninModalIsOpen(true);
    }

    const signupClick = () => {
        setSignupModalIsOpen(true);
    }

    const companyClick = () => {
        SetTabsValue(0);
        dispatch(changeForm('Company'));
    }

    const userLikeCompanyClick = () => {
        SetTabsValue(1);
        dispatch(changeForm('UserLikeCompany'));
    }

    const beforeLoginHeader = <Tabs value={TabsValue}>
        <Tab key={0} label="Company" onClick={companyClick}/>
        <Tab key={1} label="Signin" onClick={signinClick}/>
        <Tab key={2} label="Signup" onClick={signupClick}/>
        </Tabs>;

    const afterLoginHeader = <Tabs value={TabsValue}>
        <Tab key={0} label="Company" onClick={companyClick}/>
        <Tab key={1} label="UserLikeCompany" onClick={userLikeCompanyClick}/>
        <Tab key={2} label="Logout" onClick={logout}/>
        </Tabs>;

    const jwt = useSelector(state => state.jwt, []);
    
    return(
            <div>
                <AppBar position="static">
                    {jwt? afterLoginHeader : beforeLoginHeader}
                    <Signin signinModalIsOpen={signinModalIsOpen} setSigninModalIsOpen={setSigninModalIsOpen}/>
                    <Signup signupModalIsOpen={signupModalIsOpen} setSignupModalIsOpen={setSignupModalIsOpen}/>
                </AppBar>
            </div>
    );
}

export default Header;