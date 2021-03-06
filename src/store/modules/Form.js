const CHANGE_FORM = 'ModuleAction/CHANGE_FORM';

export const USERLIKECOMPANY_FORM = 'UserLikeCompany';
export const COMPANYFORM = 'Company';

export const changeForm = formClass => ({type: CHANGE_FORM, formClass});

const initialState = COMPANYFORM;

export default function form(state = initialState, action) {
    switch (action.type) {
        case CHANGE_FORM:
            return action.formClass;
        default:
            return state;
    }
}