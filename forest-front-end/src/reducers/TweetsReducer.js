import {ADD_TWEET_LIST, INIT_TWEET_LIST, UPDATE_TWEET_STATUS} from "../constants";
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
        case UPDATE_TWEET_STATUS:
        {
            let tmp = state;
            let status = action.status;
            for (let i in tmp) {
                if (tmp[i]._id === action._id) {
                    tmp[i].like = status.like;
                    tmp[i].haha = status.haha;
                    tmp[i].wow = status.wow;
                    tmp[i].sad = status.sad;
                    tmp[i].angry = status.angry;
                    tmp[i].love = status.love;
                    tmp[i].comment = status.comment;
                    tmp[i].currentReaction = status.currentReaction;
                    return tmp;
                }
            }
            return tmp;
        }
        default:
            return state
    }
};