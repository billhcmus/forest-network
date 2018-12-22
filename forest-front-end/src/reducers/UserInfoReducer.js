import {
    CHANGE_ACCOUNT_INFO,
    CHANGE_BUTTON_FOLLOW,
    CHANGE_DETAIL,
    CHANGE_FOLLOWER_COUNT,
    CHANGE_FOLLOWING_COUNT,
    CHANGE_TWEET_COUNT,
    CHANGE_USER_INFO,
    INCREASE_FOLLOWING,
} from "../constants";
import _ from 'lodash';

const initState = {
    displayName: '',
    userName:'',
    balance:0,
    bandwidth:0,
    sequence:0,
    bandwidthTime: "dd/mm/yyyy",
    avatar:'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
    theme:'https://pbs.twimg.com/profile_banners/173407308/1405769923/1500x500',
    location: "Viet Nam",
    birthdate: "15-08-1997",
    tweetCount: 0,
    followingCount: 0,
    followerCount: 0,
    hasFollow:0,
};

export default (state = initState, action) => {
    switch (action.type) {
        case CHANGE_BUTTON_FOLLOW:
            return{
                ...state,
                hasFollow: action.hasFollow ? action.hasFollow : 0
            };
        case CHANGE_TWEET_COUNT:
            return{
                ...state,
                tweetCount: action.tweetCount ? action.tweetCount : 0
            };
        case CHANGE_FOLLOWING_COUNT:
            return{
                ...state,
                followingCount: action.followingCount ? action.followingCount : 0
            };
        case CHANGE_FOLLOWER_COUNT:
            return{
                ...state,
                followerCount: action.followerCount ? action.followerCount : 0
            };
        case CHANGE_USER_INFO:
            return{
                ...state,
                displayName: action.user.name ? action.user.name.toString('utf-8') : "Unknown",
                avatar: action.user.picture ? action.user.picture : 'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
            };
        case CHANGE_ACCOUNT_INFO:
            return{
                ...state,
                userName: action.account._id,
                bandwidthTime: _.get(action.account, "bandwidthTime") ? new Date(action.account.bandwidthTime) : "dd/mm/yyyy" ,
                balance:  action.account.balance,
                bandwidth: action.account.bandwidth,
                sequence: action.account.sequence
            };

        case INCREASE_FOLLOWING:
            return {
                ...state,
                followingCount: state.followingCount + 1
            };

        case CHANGE_DETAIL:
            return {
                ...state,
                displayName: action.userDetail.displayName,
                location: action.userDetail.location,
                birthdate: action.userDetail.birthday,
            };

        default:
            return state
    }
};