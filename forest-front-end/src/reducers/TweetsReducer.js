import {ADD_TWEET_LIST} from "../constants";

const initState = {
    listTweet:[
    ]
};


export default (state = initState, action) => {
    switch (action.type) {
        case ADD_TWEET_LIST:
        {
            console.log(action.tweets)
            let tmp = state.listTweet;
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