import { CHANGE_FOLLOWING_LIST, ADD_FOLLOWING_LIST } from "../constants/index";

const initState =[];

export default (state = initState, action) => {
    switch (action.type) {
        case CHANGE_FOLLOWING_LIST: {
            let newState = [];
            if (action.followings) {
                action.followings.forEach((user) => {
                    if (user) {
                        newState = [...newState, {
                            userName: user._id,
                            avatar: user.picture,
                            displayName: user.name
                        }]
                    }
                });
            }
            return newState;
        }
        case ADD_FOLLOWING_LIST:
        {
            let newState = state;
            if (action.followings) {
                action.followings.forEach((user) => {
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