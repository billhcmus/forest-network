import {OrderedMap} from 'immutable'
import {DISMISS_ITEM_RECOMMEND} from "../constants";

let recommend = new OrderedMap();
recommend = recommend.set('@BarackObama', {
    userName:'@BarackObama',
    displayName:'BarackObama',
    avatar:'https://pbs.twimg.com/profile_images/822547732376207360/5g0FC8XX_bigger.jpg'
});
recommend = recommend.set('@EmmaWatson', {
    userName:'@EmmaWatson',
    displayName:'EmmaWatson',
    avatar:'https://pbs.twimg.com/profile_images/1039929617598087169/wpthjCyB_bigger.jpg'
});

let initState = {
    recommendList: recommend
};

export default (state=initState, action) => {
    switch (action.type) {
        case DISMISS_ITEM_RECOMMEND:
            return {
              recommendList: state.recommendList.delete(action.payload)
            };
        default:
            return state;
    }
}