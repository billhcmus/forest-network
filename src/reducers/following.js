const initState = {
    listFollowing:[
        {
            userName:'@BarackObama ',
            displayName:'BarackObama',
            avatar:'https://pbs.twimg.com/profile_images/822547732376207360/5g0FC8XX_bigger.jpg'
        },
        {
            userName:'@EmmaWatson ',
            displayName:'EmmaWatson',
            avatar:'https://pbs.twimg.com/profile_images/1039929617598087169/wpthjCyB_bigger.jpg'
        }
    ]
};


export default (state = initState, action) => {
    switch (action.type) {
        default:
            return state
    }
};