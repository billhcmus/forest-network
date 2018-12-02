import { combineReducers } from 'redux';
import userInfo from  './userInfo'
import follower from "./follower";
import following from "./following";
import tweets from "./tweets";
import RecommendReducer from './RecommendReducer'

export default combineReducers({
    userInfo,
    follower,
    following,
    tweets,
    RecommendReducer
});