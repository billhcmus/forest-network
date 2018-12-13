import {encode,sign} from '../transaction';
import WebService from '../webservice'

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
                }
                sign(tx, secret);
                let data_encoding = '0x' + encode(tx).toString('hex');
            })
        }
    }

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