import {
    ADD_TWEET_LIST,
    CHANGE_ACCOUNT_INFO,
    CHANGE_AUTH_TAB,
    CHANGE_BUTTON_FOLLOW,
    CHANGE_DETAIL,
    CHANGE_FOLLOWER_COUNT,
    CHANGE_FOLLOWER_LIST,
    CHANGE_FOLLOWING_COUNT,
    CHANGE_FOLLOWING_LIST,
    CHANGE_TWEET_COUNT,
    CHANGE_USER_INFO,
    DISMISS_ITEM_RECOMMEND,
    INCREASE_FOLLOWING,
    SET_LOGIN_INFO,
} from "../constants";
// import {encode,sign} from '../transaction';
import WebService from '../webservice'

export const dismissUserRecommend = (username) => (
    {type: DISMISS_ITEM_RECOMMEND, payload: username}
);

export const increaseFollowing = () => (
    {type: INCREASE_FOLLOWING}
);

export const updateDetail = (userDetail) => (
    {type: CHANGE_DETAIL, userDetail: userDetail}
);

export const changeAuthTab = (status) => (
    {type: CHANGE_AUTH_TAB, payload: status}
);

export const changeAcountInfo = (account) => (
    {type: CHANGE_ACCOUNT_INFO, account: account}
);

export const changeUserInfo = (user) => (
    {type: CHANGE_USER_INFO, user: user}
);

export const addTweetList = (tweets) => (
    {type: ADD_TWEET_LIST, tweets: tweets}
);

export const changeCountTweet = (count) => (
    {type: CHANGE_TWEET_COUNT, tweetCount: count}
);

export const changeCountFollowing = (count) => (
    {type: CHANGE_FOLLOWING_COUNT, followingCount: count}
);

export const changeCountFollower = (count) => (
    {type: CHANGE_FOLLOWER_COUNT, followerCount: count}
);

export const setLoginInfo = (publicKey) => (
    {type: SET_LOGIN_INFO, loginer: publicKey}
);

export const changeListFollowing = (followings) => (
    {type: CHANGE_FOLLOWING_LIST, followings: followings}
);

export const changeListFollower = (followers) => (
    {type: CHANGE_FOLLOWER_LIST, followers: followers}
);

export const updateButtonFollow = (exists) => (
    {type: CHANGE_BUTTON_FOLLOW, hasFollow: exists}
);

export const toggleFollow = (hasFollow) => (
    {type: CHANGE_BUTTON_FOLLOW, hasFollow: (hasFollow === 1) ? 0 : 1}
);



export const updatePeopleInfo = (loginKey, peopleKey) =>
    (dispatch, getState) => {
        let service = new WebService;
        service.get(`api/accountInfo/?id=${peopleKey}`).then(account => {
            console.log("account",account)
            dispatch(changeAcountInfo(account.data))
        })
        service.get(`api/userInfo/?id=${peopleKey}`).then(user => {
            dispatch(changeUserInfo(user.data))
        })
        service.get(`api/isfollow/?address1=${loginKey}&address2=${peopleKey}`).then(exists => {
            dispatch(updateButtonFollow(exists.data))
        })
    }

export const updateListFollowing = (publicKey) =>
    (dispatch, getState) => {
        let service = new WebService;
        service.get(`api/followings/?id=${publicKey}&needMore=1`).then(followings => {
            dispatch(changeListFollowing(followings.data))
        })
    }

export const updateListFollower = (publicKey) =>
    (dispatch, getState) => {
        let service = new WebService;
        service.get(`api/followers/?id=${publicKey}`).then(followers => {
            dispatch(changeListFollower(followers.data))
        })
    }

export const getLoginerInfo = (publicKey) =>
    (dispatch, getState) => {
        let service = new WebService;
        service.get(`api/userInfo/?id=${publicKey}`).then(user => {
            dispatch(setLoginInfo(user.data))
        })
    }

export const getSomeNewestTweet = (publicKey) =>
    (dispatch, getState) => {
        let service = new WebService;
        service.get(`api/tweet/?id=${publicKey}&start=0&count=5`).then(tweets => {
            dispatch(addTweetList(tweets.data))
        })
    }

export const getCount = (publicKey) =>
    (dispatch, getState) => {
        let service = new WebService;
        service.get(`api/tweetCount?id=${publicKey}`).then(count => {
            dispatch(changeCountTweet(count.data))
        })
        service.get(`api/followingsCount?id=${publicKey}`).then(count => {
            dispatch(changeCountFollowing(count.data))
        })
        service.get(`api/followersCount?id=${publicKey}`).then(count => {
            dispatch(changeCountFollower(count.data))
        })
    }

