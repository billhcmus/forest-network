import {SET_USER_INFO} from "../constants";

const initState = {
    displayName: 'No',
    userName:'No',
    avatar:'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
};

export default (state = initState, action) => {
    switch (action.type) {
        case SET_USER_INFO:
            return{
                ...state,
                userName: action.payload._id,
                displayName: action.payload.name ? action.payload.name.toString('utf-8') : "Unknown",
                avatar: action.payload.picture ? action.payload.picture : 'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
            };
        default:
            return state
    }
};