import {DISMISS_ITEM_RECOMMEND} from "../constants";

export const dismissUserRecommend = (username) => (
    {type: DISMISS_ITEM_RECOMMEND, payload: username}
);