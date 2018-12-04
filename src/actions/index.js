import {DISMISS_ITEM_RECOMMEND, INCREASE_FOLLOWING} from "../constants";

export const dismissUserRecommend = (username) => (
    {type: DISMISS_ITEM_RECOMMEND, payload: username}
);

export const increaseFollowing = () => (
    {type: INCREASE_FOLLOWING}
);