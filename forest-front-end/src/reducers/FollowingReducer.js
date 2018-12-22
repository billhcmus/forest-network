import {CHANGE_FOLLOWING_LIST} from "../constants";

const initState =[]

export default (state = initState, action) => {
    switch (action.type) {
        case CHANGE_FOLLOWING_LIST:
            let tmp = [];
            if (action.followings) {
                action.followings.forEach((user) => {
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