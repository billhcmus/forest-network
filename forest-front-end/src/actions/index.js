import {DISMISS_ITEM_RECOMMEND, INCREASE_FOLLOWING, UPDATE_DETAIL, CHANGE_AUTH_TAB,CHANGE_ACCOUNT_INFO,GET_USER_INFO} from "../constants";
// import {encode,sign} from '../transaction';
import WebService from '../webservice'

export const dismissUserRecommend = (username) => (
    {type: DISMISS_ITEM_RECOMMEND, payload: username}
);

export const increaseFollowing = () => (
    {type: INCREASE_FOLLOWING}
);

export const updateDetail = (userDetail) => (
    {type: UPDATE_DETAIL, userDetail: userDetail}
);

export const changeAuthTab = (status) => (
    {type: CHANGE_AUTH_TAB, payload: status}
);

export const changeAcountInfo = (account) => (
    {type: CHANGE_ACCOUNT_INFO, account: account}
);

export const getUserInfo = (user) => (
    {type: GET_USER_INFO, user: user}
);


export const getPeopleLoginInfo = (publicKey) =>
    (dispatch, getState) =>{
        let service = new WebService;
        service.get(`api/accountInfo/?id=${publicKey}`).then(account =>{
            console.log(account)
            dispatch(changeAcountInfo(account.data))
        })
        service.get(`api/userInfo/?id=${publicKey}`).then(user =>{
            console.log(user)
            dispatch(getUserInfo(user.data))
        })
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
