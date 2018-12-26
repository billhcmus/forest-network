import {
    CHANGE_TWEET_DETAIL_COMMENT,
    CHANGE_TWEET_DETAIL_MAIN,
    ADD_TWEET_DETAIL_COMMENT,
    REALTIME_TWEET_DETAIL_COMMENT,
    REALTIME_TWEET_DETAIL_STATUS,
} from "../constants";
const initState = {
    comments:[],
    main: ""
};


export default (state = initState, action) => {
    switch (action.type) {
        case CHANGE_TWEET_DETAIL_MAIN:
            return {
                ...state,
                main: action.main
            };
        case CHANGE_TWEET_DETAIL_COMMENT: {
            let tmp = {
                ...state,
                comments: []
            };
            if (action.comments) {
                action.comments.forEach((comment) => {
                    if (comment) {
                        tmp.comments = [...tmp.comments,comment]
                    }
                })
            }
            return tmp
        }
        case ADD_TWEET_DETAIL_COMMENT: {
            let tmp = {
                ...state,
            };
            if (action.comments) {
                action.comments.forEach((comment) => {
                    if (comment) {
                        tmp.comments = [...tmp.comments,comment]
                    }
                })
            }
            return tmp
        }
        case REALTIME_TWEET_DETAIL_COMMENT: {
            let tmp = {
                ...state,
            }
            if (action.comment) {
                tmp.comments = [action.comment,...tmp.comments]
                tmp.main.comment++
            }
            return tmp
        }
        case REALTIME_TWEET_DETAIL_STATUS:{
            {
                let tmp = {
                    ...state,
                }
                let status = action.status;
                if (tmp.main._id === status._id) {
                    tmp.main = status
                    return tmp;
                }
                for (let i in tmp.comments) {
                    if (tmp.comments[i]._id === status._id) {
                        tmp.comments[i] = status
                        return tmp;
                    }
                }
                return tmp;
            }
        }
        default:
            return state
    }
};