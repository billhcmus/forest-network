import { combineReducers } from 'redux';
import userInfo from './UserInfoReducer'
import follower from "./FollowerReducer";
import following from "./FollowingReducer";
import tweets from "./TweetsReducer";
import tweetDetail from "./TweetDetailReducer";
import RecommendReducer from './RecommendReducer';
import AuthReducer from './AuthReducer';
import loginer from  './UserReducer'
import activeUser from './ActiveUserReducer'

export default combineReducers({
    userInfo,
    follower,
    following,
    tweets,
    tweetDetail,
    RecommendReducer,
    AuthReducer,
    loginer,
    activeUser,
});