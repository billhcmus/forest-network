import { combineReducers } from 'redux';
import userInfo from  './userInfo'
import follower from "./follower";
import following from "./following";
import tweets from "./tweets";

export default combineReducers({
    userInfo,
    follower,
    following,
    tweets
});