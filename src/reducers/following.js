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
}


const following = (state = initState, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export default following