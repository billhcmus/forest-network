// import EDIT_PROFILE from '../constants/index'
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
        followingCount: 2,
        followerCount: 20,
        likesCount:5,
    }
};

export default (state = initState, action) => {
    switch (action.type) {
        case 'EDIT_PROFILE':

        default:
            return state
    }
};