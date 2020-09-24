const SET_USERLIKECOMPANY = 'USERLIKECOMPANY/SET_USERLIKECOMPANY';
const INSERT_USERLIKECOMPANY = 'USERLIKECOMPANY/INSERT_USERLIKECOMPANY';
const DELETE_USERLIKECOMPANY = 'USERLIKECOMPANY/DELETE_USERLIKECOMPANY';
const DROP_USERLIKECOMPANY = 'USERLIKECOMPANY/DROP_USERLIKECOMPANY';

export const set_userLikeCompany = companies => ({type: SET_USERLIKECOMPANY, companies});
export const insert_userLikeCompany = company => ({type: INSERT_USERLIKECOMPANY, company});
export const delete_userLikeCompany  = companyID => ({type: DELETE_USERLIKECOMPANY, companyID});
export const drop_userLikeCompany = () => ({type: DROP_USERLIKECOMPANY});

const initialState = null;

export default function userLikeCompany(state = initialState, action) {
    switch (action.type) {
        case SET_USERLIKECOMPANY:
            return action.companies
        case INSERT_USERLIKECOMPANY:
            return [
                ...state,
                action.company
            ]
        case DELETE_USERLIKECOMPANY:
            const idx = state.findIndex(function(item) {return item.id === action.companyID})
            if (idx > -1) state.splice(idx ,1)
            return state;
        default:
            return state;
    }
}