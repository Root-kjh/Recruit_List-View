import { combineReducers } from 'redux';
import jwt from './JWT';
import form from './Form';
import UserLikeCompany from './UserLikeCompany';

const reducer = combineReducers({
    jwt,
    form,
    UserLikeCompany
});

export default reducer;