import {DISMISS_ITEM_RECOMMEND, INCREASE_FOLLOWING, CHANGE_DETAIL,
    CHANGE_AUTH_TAB,CHANGE_ACCOUNT_INFO,ADD_TWEET_LIST,CHANGE_USER_INFO,
    CHANGE_FOLLOWING_COUNT,CHANGE_TWEET_COUNT} from "../constants";
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


export const updatePeopleLoginInfo = (publicKey) =>
    (dispatch, getState) =>{
        let service = new WebService;
        service.get(`api/accountInfo/?id=${publicKey}`).then(account =>{
            dispatch(changeAcountInfo(account.data))
        })
        service.get(`api/userInfo/?id=${publicKey}`).then(user =>{
            dispatch(changeUserInfo(user.data))
        })
    }

export const getSomeNewestTweet = (publicKey) =>
    (dispatch, getState) =>{
        let service = new WebService;
        service.get(`api/tweet/?id=${publicKey}&start=0&count=5`).then(tweets =>{
            dispatch(addTweetList(tweets.data))
        })
    }

export const getCount = (publicKey) =>
    (dispatch, getState) =>{
        let service = new WebService;
        service.get(`api/tweet/count?id=${publicKey}`).then(count =>{
            dispatch(changeCountTweet(count.data))
        })
        // service.get(`api/folowing/count?id=${publicKey}`).then(count =>{
        //     dispatch(changeCountFollowing(count.data))
        // })
    }

export const payment = (address,amount,secret) =>
    (dispatch, getState) => {
        {
            // WebService.get(`sequence/id=${account}`).then(seq =>{
            //     let tx = {
            //         version: 1,
            //         account: '',
            //         sequence: seq+1,
            //         memo: Buffer.alloc(0),
            //         operation: 'payment',
            //         params: {address: address, amount: amount},
            //     }
            //     sign(tx, secret)
            //     let data_encoding = '0x'+encode(tx).toString('hex');
            // })
        }
    };
