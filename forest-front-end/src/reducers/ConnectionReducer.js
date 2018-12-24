import {CREATE_NEW_CONNECTION} from "../constants";

export default (state=null, action) => {
    switch (action.type) {
        case CREATE_NEW_CONNECTION:
            return action.payload;
        default:
            return state;
    }
}