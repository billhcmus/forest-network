const initState = {
    displayName: 'Nguyễn Đình Tiến',
    userName:'@Nguynnh74289770',
    joinTime: 1543641338,
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