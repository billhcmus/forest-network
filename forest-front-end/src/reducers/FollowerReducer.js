import {ADD_FOLLOWER_LIST, CHANGE_FOLLOWER_LIST} from "../constants";

const initState =[]

export default (state = initState, action) => {
    switch (action.type) {
        case CHANGE_FOLLOWER_LIST: {
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
        }
        case ADD_FOLLOWER_LIST:
        {
            let newState = state;
            if (action.followers) {
                action.followers.forEach((user) => {
                    if (user) {
                        newState = [...newState, {
                            userName: user._id,
                            avatar: user.picture,
                            displayName:user.name
                        }]
                    }
                });
            }
            return newState;
        }
        default:
            return state
    }
};