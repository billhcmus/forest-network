import {ADD_TWEET_LIST} from "../constants";

const initState = [];


export default (state = initState, action) => {
    switch (action.type) {
        case ADD_TWEET_LIST:
        {
            let tmp = state;
            if (action.tweets) {
                action.tweets.forEach((tweet) => {
                    tmp = [...tmp, tweet]
                })
            }
            return tmp
        }
        default:
            return state
    }
};