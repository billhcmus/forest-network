import {CHANGE_FOLLOWER_LIST} from "../constants";

const initState =[]

export default (state = initState, action) => {
    switch (action.type) {
        case CHANGE_FOLLOWER_LIST:
            let tmp = [];
            if (action.followers) {
                action.followers.forEach((user) => {
                    tmp = [...tmp, user]
                })
            }
            return tmp
        default:
            return state
    }
};