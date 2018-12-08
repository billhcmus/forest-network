import {INCREASE_FOLLOWING,CHANGE_DETAIL} from "../constants";

const initState = {
    displayName: 'Nguyễn Đình Tiến',
    userName:'Nguynnh74289770',
    joinTime: 1543832873,
    avatar:'https://pbs.twimg.com/profile_images/552490918989668352/ywlPHVTJ_400x400.jpeg',
    theme:'https://pbs.twimg.com/profile_banners/173407308/1405769923/1500x500',
    location: "Viet Nam",
    birthdate: 1543832873,
    other:{
        tweetCount: 10,
        followingCount: 4,
        followerCount: 4,
        likesCount:5,
    }
};

export default (state = initState, action) => {
    switch (action.type) {
        case INCREASE_FOLLOWING:
            return {
                ...state,
                other: {
                    ...state.other,
                    followingCount: state.other.followingCount + 1
                }
            };
        case CHANGE_DETAIL:
            return {
                ...state,
                displayName: action.userDetail.userName,
                location: action.userDetail.location,
                birthdate: action.userDetail.birthday,
            }
        default:
            return state
    }
};