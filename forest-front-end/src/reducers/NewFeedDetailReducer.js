import {
    CHANGE_TWEET_DETAIL_COMMENT,
    CHANGE_TWEET_DETAIL_MAIN,
    ADD_TWEET_DETAIL_COMMENT,
    GET_NEWFEED_DETAIL_MAIN
} from "../constants";
const initState = {
    comments:[],
    main: ""
};


export default (state = initState, action) => {
    switch (action.type) {
        case GET_NEWFEED_DETAIL_MAIN:
            return {
                ...state,
                main: action.main_new
            };
        // case CHANGE_TWEET_DETAIL_COMMENT: {
        //     let tmp = {
        //         ...state,
        //         comments: []
        //     };
        //     if (action.comments) {
        //         action.comments.forEach((comment) => {
        //             if (comment) {
        //                 tmp.comments = [...tmp.comments, comment]
        //             }
        //         })
        //     }
        //     return tmp
        // }
        // case ADD_TWEET_DETAIL_COMMENT: {
        //     let tmp = {
        //         ...state,
        //     };
        //     if (action.comments) {
        //         action.comments.forEach((comment) => {
        //             if (comment) {
        //                 tmp.comments = [comment, ...tmp.comments]
        //             }
        //         })
        //     }
        //     return tmp
        // }
        default:
            return state
    }
};