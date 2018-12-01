const initState = {
    listFollowing:[
        {
            userName:'@BarackObama ',
            displayName:'BarackObama'
        },
        {
            userName:'@EmmaWatson ',
            displayName:'EmmaWatson'
        }
    ]
};


export default (state = initState, action) => {
    switch (action.type) {
        default:
            return state
    }
};