import {
    ADD_TWEET_LIST,
    INIT_TWEET_LIST,
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
    SET_USER_INFO,
    SET_ACTIVE_USER,
    CHANGE_TWEET_DETAIL_COMMENT,
    CHANGE_TWEET_DETAIL_MAIN,
    ADD_TWEET_DETAIL_COMMENT,
    ADD_FOLLOWING_LIST,
    ADD_FOLLOWER_LIST,
    CHANGE_PAYMENT_LIST,
    CHANGE_TRANSACTION, CREATE_NEW_CONNECTION, UPDATE_TWEET_STATUS,
    INIT_NEW_LIST,
} from "../constants";

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

export const initTweetList = (tweets) => (
    {type: INIT_TWEET_LIST, tweets: tweets}
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

export const setUserInfo = (user) => (
    {type: SET_USER_INFO, userLogin: user}
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

export const activeUser = (userID) => (
    {type: SET_ACTIVE_USER, activeUser: userID}
);

export const changeTweetDetailMain = (main) => (
    {type: CHANGE_TWEET_DETAIL_MAIN, main: main}
);

export const changeTweetDetailComment = (comments) => (
    {type: CHANGE_TWEET_DETAIL_COMMENT, comments: comments}
);

export const updateTweetStatus = (_id, status) => (
    {type: UPDATE_TWEET_STATUS, _id: _id, status: status}
);

export const addTweetDetailComment = (comments) =>(
    {type: ADD_TWEET_DETAIL_COMMENT, comments: comments}
);
export const addMoreListFollower = (followers) =>(
    {type: ADD_FOLLOWER_LIST, followers: followers}
);

export const addMoreListFollowing = (followings) =>(
    {type: ADD_FOLLOWING_LIST, followings: followings}
);

export const changeListPayment = (payments) => (
    {type: CHANGE_PAYMENT_LIST, payments: payments}
);

export const changeTransaction = (transaction) => (
    {type: CHANGE_TRANSACTION, transaction: transaction}
);

export const createNewConnection = (connection) => (
    {type: CREATE_NEW_CONNECTION, payload: connection}
);

export const initNewsList = (news) => (
    {type: INIT_NEW_LIST, news: news}
);

export const getDetailTweet = (object, loginer) =>
    (dispatch, getState) => {
        dispatch(changeTweetDetailMain(object));
        let service = new WebService();
        service.get(`api/tweetDetail/?object=${object._id}&loginer=${loginer}&start=0&count=5`).then(postDetail => {
            dispatch(changeTweetDetailComment(postDetail.data))
        });
    };

export const getDetailTransaction = (id) =>
    (dispatch, getState) => {
        let service = new WebService();
        service.get(`api/transaction/?id=${id}`).then(transaction => {
            dispatch(changeTransaction(transaction.data))
        })
    };

export const updatePayment = (publicKey) =>
    (dispatch, getState) => {
        let service = new WebService();
        service.get(`api/payments/?id=${publicKey}`).then(payments => {
            dispatch(changeListPayment(payments.data))
        })
    };

export const getMoreDetailTweet = (object, loginer,offset) =>
    (dispatch, getState) => {
        let service = new WebService();
        service.get(`api/tweetDetail/?object=${object._id}&loginer=${loginer}&start=${offset}&count=5`).then(postDetail => {
            dispatch(addTweetDetailComment(postDetail.data))
        });
    };

export const updatePeopleInfo = (loginKey, peopleKey) =>
    (dispatch, getState) => {
        let service = new WebService();
        service.get(`api/accountInfo/?id=${peopleKey}`).then(account => {
            dispatch(changeAcountInfo(account.data))
        });
        service.get(`api/userInfo/?id=${peopleKey}`).then(user => {
            dispatch(changeUserInfo(user.data))
        });
        service.get(`api/isfollow/?address1=${loginKey}&address2=${peopleKey}`).then(exists => {
            dispatch(updateButtonFollow(exists.data))
        })
    };

export const updateListFollowing = (publicKey) =>
    (dispatch, getState) => {
        let service = new WebService();
        service.get(`api/followings/?id=${publicKey}&needMore=1&start=0&count=9`).then(followings => {
            dispatch(changeListFollowing(followings.data))
        })
    };

export const updateListFollower = (publicKey) =>
    (dispatch, getState) => {
        let service = new WebService();
        service.get(`api/followers/?id=${publicKey}&start=0&count=9`).then(followers => {
            dispatch(changeListFollower(followers.data))
        })
    };

export const addListFollowing = (publicKey,offset) =>
    (dispatch, getState) => {
        let service = new WebService();
        service.get(`api/followings/?id=${publicKey}&needMore=1&start=${offset}&count=9`).then(followings => {
            dispatch(addMoreListFollowing(followings.data))
        })
    };

export const addListFollower = (publicKey,offset) =>
    (dispatch, getState) => {
        let service = new WebService();
        service.get(`api/followers/?id=${publicKey}&start=${offset}&count=9`).then(followers => {
            dispatch(addMoreListFollower(followers.data))
        })
    };

export const getLoginerInfo = (publicKey) =>
    (dispatch, getState) => {
        let service = new WebService();
        service.get(`api/userInfo/?id=${publicKey}`).then(user => {
            dispatch(setUserInfo(user.data))
        })
    };

export const getSomeNewestTweet = (publicKey,loginerKey) =>
    (dispatch, getState) => {
        let service = new WebService();
        service.get(`api/tweet/?id=${publicKey}&loginer=${loginerKey}&start=0&count=10`).then(tweets => {
            dispatch(initTweetList(tweets.data))
        })
    };

export const getSomeMoreTweet = (publicKey,loginerKey,offset) =>
    (dispatch, getState) => {
        let service = new WebService();
        service.get(`api/tweet/?id=${publicKey}&loginer=${loginerKey}&start=${offset}&count=10`).then(tweets => {
            dispatch(addTweetList(tweets.data))
        })
    };

export const getCount = (publicKey) =>
    (dispatch, getState) => {
        let service = new WebService();
        service.get(`api/tweetCount?id=${publicKey}`).then(count => {
            dispatch(changeCountTweet(count.data))
        });
        service.get(`api/followingsCount?id=${publicKey}`).then(count => {
            dispatch(changeCountFollowing(count.data))
        });
        service.get(`api/followersCount?id=${publicKey}`).then(count => {
            dispatch(changeCountFollower(count.data))
        })
    };

export const getUserInfo = (publicKey) =>
    (dispatch, getState) =>{
        let service = new WebService();
        console.log("abc");
        service.get(`api/userInfo/?id=${publicKey}`).then(user =>{
            //dispatch(changeUserInfo(user.data))
        })
    };

export const getNews = (publicKey, page = 1, limit = 5) =>
    (dispatch, getState) => {
        let service = new WebService();
        service.get(`api/newfeeds/?id=${publicKey}&start=${page}&limit=${limit}`).then(news => {
            dispatch(initNewsList(news.data))
        })
    };
