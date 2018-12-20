import {SET_LOGIN_INFO} from "../constants";

const initState = {
    displayName: 'No',
    userName:'No',
    avatar:'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
};

export default (state = initState, action) => {
    switch (action.type) {
        case SET_LOGIN_INFO:
                console.log(action)
            return{
                ...state,
                userName: action.loginer._id,
                // displayName: action.loginer.name ? action.user.name.toString('utf-8') : "Unknown",
                avatar: action.loginer.picture ? action.loginer.picture : 'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
            };
        default:
            return state
    }
};