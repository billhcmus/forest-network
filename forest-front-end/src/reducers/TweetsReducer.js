import {ADD_TWEET_LIST,INIT_TWEET_LIST} from "../constants";

const initState = [];


export default (state = initState, action) => {
    switch (action.type) {
        case INIT_TWEET_LIST:
        {
            let tmp = [];
            if (action.tweets) {
                action.tweets.forEach((tweet) => {
                    if (tweet) {
                        tmp = [...tmp, tweet]
                    }
                })
            }
            return tmp
        }
        case ADD_TWEET_LIST:
        {
            let tmp = state;
            if (action.tweets) {
                action.tweets.forEach((tweet) => {
                    if (tweet) {
                        tmp = [...tmp, tweet]
                    }
                })
            }
            return tmp
        }
        default:
            return state
    }
};