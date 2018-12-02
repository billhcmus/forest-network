const initState = {
    displayName: 'Nguyễn Đình Tiến',
    userName:'@Nguynnh74289770',
    joinTime: 1543641338,
    urlPhotoCover: "https://pbs.twimg.com/profile_banners/173407308/1405769923/1500x500",
    urlAvatar:"https://pbs.twimg.com/profile_images/552490918989668352/ywlPHVTJ_400x400.jpeg",
    other:{
        tweetCount: 10,
        followingCount: 2,
        followerCount: 20,
        likesCount:5,
    }
};

export default (state = initState, action) => {
    switch (action.type) {
        default:
            return state
    }
};