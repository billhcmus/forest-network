import {SET_USER_INFO} from "../constants";

const initState = {
    displayName: '',
    userName:'',
    avatar:'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
};

export default (state = initState, action) => {
    switch (action.type) {
        case SET_USER_INFO:
            return{
                ...state,
                userName: action.userLogin._id,
                displayName: action.userLogin.name ? action.userLogin.name.toString('utf-8') : "Unknown",
                avatar: action.userLogin.picture ? action.userLogin.picture : 'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
            };
        default:
            return state
    }
};