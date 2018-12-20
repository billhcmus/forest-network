import {CHANGE_AUTH_TAB} from "../constants";

const initState = {
    login: true,
    signup: false
};

export default (state = initState, action) => {
    switch (action.type) {
        case CHANGE_AUTH_TAB:
            return {
                login: action.payload.login,
                signup: action.payload.signup
            };
        default:
            return state
    }
};