const initState = {
    listFollower:[
        {
            userName:'@BarackObama ',
            displayName:'BarackObama'
        },
        {
            userName:'@EmmaWatson ',
            displayName:'EmmaWatson'
        }
    ]
}


const follower = (state = initState, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export default follower