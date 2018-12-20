import {CHANGE_FOLLOWING_LIST} from "../constants";

const initState =[]

export default (state = initState, action) => {
    switch (action.type) {
        case CHANGE_FOLLOWING_LIST:
            let tmp = [];
            if (action.followings) {
                action.followings.forEach((user) => {
                    tmp = [...tmp, user]
                })
            }
            return tmp
        default:
            return state
    }
};