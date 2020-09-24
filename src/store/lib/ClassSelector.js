import { useSelector } from 'react-redux';
import { SIGNIN_FORM, 
    SIGNUP_FORM, 
    USERLIKECOMPANY_FORM, 
    COMPANYFORM,
    LOGOUTFORM,
    changeForm } from '../modules/Form';
import { User as userContainer } from '../../containers/';
import { Company as companyContainer } from '../../containers/';
import {Company as companyForm} from '../../components/';
import {Signin as signinForm} from '../../components/';
import {Signup as signupForm} from '../../components/';
import { useDispatch } from 'react-redux';
import { drop_jwt } from '../modules/JWT';

const dispatch = useDispatch();

const formClassSelector = ()  => {
    const jwt = useSelector(state => state.jwt, []);
    const formName = useSelector(state => state.form, []);
    if (jwt) {
        if (formName === COMPANYFORM ||formName === USERLIKECOMPANY_FORM)
            return companyForm;
        else
            return -1;
    } else {
        switch (formName) {
            case COMPANYFORM:
                return companyForm;
            case SIGNIN_FORM:
                return signinForm;
            case SIGNUP_FORM:
                return signupForm;
            default:
                return;
        }
    }
}

const logout = () =>{
    dispatch(drop_jwt());
}

const containerClassSelector = () => {
    const jwt = useSelector(state => state.jwt, []);
    const formName = useSelector(state => state.form, []);
    if (jwt) {
        if (formName === COMPANYFORM || formName === USERLIKECOMPANY_FORM)
            return companyContainer;
        else if(formName === LOGOUTFORM){
            logout();
            dispatch(changeForm(COMPANYFORM));
        }

        else
            return;
    } else {
        if (formName === SIGNIN_FORM || formName === SIGNUP_FORM)
            return userContainer;
        else if (formName === COMPANYFORM)
            return companyContainer;
        else
            return;
    }
}

export {containerClassSelector, formClassSelector};