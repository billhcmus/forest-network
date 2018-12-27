import {ADD_TWEET_LIST, INIT_TWEET_LIST, REALTIME_TWEET_STATUS,REALTIME_TWEET_LIST} from "../constants";
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
        case REALTIME_TWEET_LIST:
        {
            let tmp = state;
            if (action.tweet) {
                tmp = [action.tweet,...tmp]
            }
            return [...tmp]
        }
        case REALTIME_TWEET_STATUS:
        {
            let tmp = state
            let status = action.status;
            let index = tmp.findIndex(item=>{
                return item._id === status._id
            })
            if (index >= 0 )
                tmp[index] =  status
            return [...tmp];
        }
        default:
            return state
    }
};