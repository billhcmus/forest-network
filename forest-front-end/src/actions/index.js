import {DISMISS_ITEM_RECOMMEND, INCREASE_FOLLOWING,CHANGE_DETAIL} from "../constants";
import {encode,sign} from '../transaction';
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


export const create_account = (address,secret) =>
    (dispatch, getState) => {
        {
            WebService.get(`sequence/id=${account}`).then(seq =>{
                let tx = {
                    version: 1,
                    account: '',
                    sequence: seq+1 ,
                    memo: Buffer.alloc(0),
                    operation: 'create_account',
                    params: {
                        address: address
                    },
                };
                sign(tx, secret);
                let data_encoding = '0x' + encode(tx).toString('hex');
            })
        }
    };

export const payment = (address,amount,secret) =>
    (dispatch, getState) => {
        {
            WebService.get(`sequence/id=${account}`).then(seq =>{
                let tx = {
                    version: 1,
                    account: '',
                    sequence: seq+1,
                    memo: Buffer.alloc(0),
                    operation: 'payment',
                    params: {address: address, amount: amount},
                }
                sign(tx, secret)
                let data_encoding = '0x'+encode(tx).toString('hex');
            })
        }
    }