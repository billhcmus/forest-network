import {CHANGE_FOLLOWER_LIST} from "../constants";

const initState =[]

export default (state = initState, action) => {
    switch (action.type) {
        case CHANGE_FOLLOWER_LIST:
            let tmp = [];
            if (action.followers) {
                action.followers.forEach((user) => {
                    if (user) {
                        tmp = [...tmp, {
                            userName: user._id,
                            avatar: user.picture,
                            displayName: user.name
                        }]
                    }
                })
            }
            return tmp
        default:
            return state
    }
};