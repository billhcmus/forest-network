// Constant will define here.
import moment from "moment";

export const DISMISS_ITEM_RECOMMEND = 'DISMISS_ITEM_RECOMMEND';
export const INCREASE_FOLLOWING = 'INCREASE_FOLLOWING';
export const INCREASE_TWEET ='INCREASE_TWEET'
export const UPDATE_DETAIL = 'UPDATE_DETAIL';
export const CHANGE_AUTH_TAB = 'CHANGE_AUTH_TAB';
export const CHANGE_ACCOUNT_INFO = 'CHANGE_ACCOUNT_INFO';
export const CHANGE_USER_INFO = 'CHANGE_USER_INFO';
export const ADD_TWEET_LIST = 'ADD_TWEET_LIST';
export const INIT_TWEET_LIST = 'INIT_TWEET_LIST';
export const CHANGE_TWEET_COUNT = 'CHANGE_TWEET_COUNT';
export const CHANGE_FOLLOWING_COUNT = 'CHANGE_FOLLOWING_COUNT';
export const SET_USER_INFO = 'SET_USER_INFO';
export const CHANGE_FOLLOWING_LIST = 'CHANGE_FOLLOWING_LIST';
export const CHANGE_FOLLOWER_LIST = 'CHANGE_FOLLOWER_LIST';
export const CHANGE_FOLLOWER_COUNT = 'CHANGE_FOLLOWER_COUNT';
export const CHANGE_BUTTON_FOLLOW = 'CHANGE_BUTTON_FOLLOW';
export const  SET_ACTIVE_USER = 'SET_ACTIVE_USER';
export const CHANGE_TWEET_DETAIL_MAIN ='CHANGE_TWEET_DETAIL_MAIN';
export const CHANGE_TWEET_DETAIL_COMMENT ='CHANGE_TWEET_DETAIL_COMMENT';
export const ADD_TWEET_DETAIL_COMMENT = 'ADD_TWEET_DETAIL_COMMENT';
export const REALTIME_TWEET_DETAIL_COMMENT = 'REALTIME_TWEET_DETAIL_COMMENT'
export const REALTIME_TWEET_DETAIL_STATUS = 'REALTIME_TWEET_DETAIL_STATUS'
export const REALTIME_TWEET_STATUS = 'REALTIME_TWEET_STATUS';
export const REALTIME_TWEET_LIST = 'REALTIME_TWEET_LIST'
export const CHANGE_DETAIL = 'CHANGE_DETAIL';
export const ADD_FOLLOWING_LIST = 'ADD_FOLLOWING_LIST';
export const ADD_FOLLOWER_LIST = 'ADD_FOLLOWER_LIST';
export const CHANGE_PAYMENT_LIST = 'CHANGE_PAYMENT_LIST';
export const CHANGE_TRANSACTION ='CHANGE_TRANSACTION';
export const CREATE_NEW_CONNECTION = 'CREATE_NEW_CONNECTION';
export const INIT_NEW_LIST = 'INIT_NEW_LIST';
export const GET_MORE_NEWS = 'GET_MORE_NEWS';
export const GET_NEWFEED_DETAIL_MAIN = 'GET_NEWFEED_DETAIL_MAIN';
export const BANDWIDTH_PERIOD = 86400;
export const MAX_BLOCK_SIZE = 22020096;
export const RESERVE_RATIO = 1;
export const MAX_CELLULOSE = Number.MAX_SAFE_INTEGER;
export const NETWORK_BANDWIDTH = RESERVE_RATIO * MAX_BLOCK_SIZE * BANDWIDTH_PERIOD;

/**
 * @return {number}
 */
export function CalculateOxy(balance, bandwidthTime, bandwidth) {
    const bandwidthLimit = Math.ceil(balance / MAX_CELLULOSE * NETWORK_BANDWIDTH);
    let now = moment();
    // 24 hours window max 65kB
    let duration = moment.duration(now.diff(bandwidthTime));
    let diff = duration.asSeconds();
    let used = Math.ceil(Math.max(0, (BANDWIDTH_PERIOD - diff) / BANDWIDTH_PERIOD) * bandwidth);

    return bandwidthLimit - used;
}

export function BlockAmount(bandwidth) {
   return Math.ceil(bandwidth / NETWORK_BANDWIDTH * MAX_CELLULOSE)
}
