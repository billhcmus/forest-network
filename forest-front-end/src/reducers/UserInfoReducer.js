import {CHANGE_ACCOUNT_INFO,INCREASE_FOLLOWING,CHANGE_DETAIL,CHANGE_USER_INFO} from "../constants";

const initState = {
    displayName: 'No',
    userName:'No',
    balance:0,
    bandwidth:0,
    bandwidthTime: "dd/mm/yyyy",
    avatar:'https://pbs.twimg.com/profile_images/552490918989668352/ywlPHVTJ_400x400.jpeg',
    theme:'https://pbs.twimg.com/profile_banners/173407308/1405769923/1500x500',
    location: "Viet Nam",
    birthdate: 0,
    tweetCount: 10,
    followingCount: 4,
    followerCount: 4,
    likesCount:5,
};

export default (state = initState, action) => {
    switch (action.type) {
        case CHANGE_USER_INFO:
            console.log(action)
            return{
                ...state,
                displayName: action.user.name ? action.user.name.toString('utf-8') : "Unknown",
                avatar: action.user.picture ? action.user.picture : 'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
            };
        case CHANGE_ACCOUNT_INFO:
            console.log(action)
            return{
                ...state,
                userName: action.account._id,
                bandwidthTime: action.account.bandwidthTime ? action.account.bandwidthTime : "dd/mm/yyyy" ,
                balance:  action.account.balance,
                bandwidth: action.account.bandwidth
            };
        case INCREASE_FOLLOWING:
            return {
                ...state,
                followingCount: state.followingCount + 1
            };
        case CHANGE_DETAIL:
            return {
                ...state,
                displayName: action.userDetail.userName,
                location: action.userDetail.location,
                birthdate: action.userDetail.birthday,
            };
        default:
            return state
    }
};