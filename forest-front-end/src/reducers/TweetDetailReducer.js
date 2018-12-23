import {CHANGE_TWEET_DETAIL_COMMENT,CHANGE_TWEET_DETAIL_MAIN} from "../constants";
const initState = {
    comments:[]
}


export default (state = initState, action) => {
    switch (action.type) {
        case CHANGE_TWEET_DETAIL_MAIN:
            return {
                ...state,
                main: action.main
            }
        case CHANGE_TWEET_DETAIL_COMMENT:
            let tmp = {
                ...state,
                comments:[]
            };
            if (action.comments) {
                action.comments.forEach((comment) => {
                    if (comment) {
                        tmp.comments = [...tmp.comments,comment]
                    }
                })
            }
            return tmp
        default:
            return state
    }
};