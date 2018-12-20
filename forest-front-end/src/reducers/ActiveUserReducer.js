import {SET_ACTIVE_USER} from "../constants";


export default (state = [], action) => {
    switch (action.type) {
        case SET_ACTIVE_USER:
            let tmp = action.activeUser
            return tmp
        default:
            return state
    }
};