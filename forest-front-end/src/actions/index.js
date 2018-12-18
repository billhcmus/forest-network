import {DISMISS_ITEM_RECOMMEND, INCREASE_FOLLOWING, UPDATE_DETAIL, CHANGE_AUTH_TAB} from "../constants";
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
