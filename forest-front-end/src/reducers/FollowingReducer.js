const initState = {
    listFollowing:[
        {
            userName:'@BarackObama ',
            displayName:'BarackObama',
            avatar:'https://pbs.twimg.com/profile_images/822547732376207360/5g0FC8XX_bigger.jpg',
            theme:'',
            bio:''
        },
        {
            userName:'@EmmaWatson ',
            displayName:'EmmaWatson',
            avatar:'https://pbs.twimg.com/profile_images/1039929617598087169/wpthjCyB_bigger.jpg',
            theme:'https://pbs.twimg.com/profile_banners/153750512/1449022986/600x200',
            bio:'The famous actress.'
        },
        {
            userName:'@b89560',
            displayName:'Hyomin',
            avatar:'https://pbs.twimg.com/profile_images/671876313368530944/sX2nY4z0_bigger.jpg',
            theme:'https://pbs.twimg.com/profile_banners/153750512/1449022986/600x200',
            bio:'Member of T-ara'
        },
        {
            userName:'@b89560',
            displayName:'Hyomin',
            avatar:'https://pbs.twimg.com/profile_images/671876313368530944/sX2nY4z0_bigger.jpg',
            theme:'https://pbs.twimg.com/profile_banners/153750512/1449022986/600x200',
            bio:'Member of T-ara'
        }
    ]
};


export default (state = initState, action) => {
    switch (action.type) {
        default:
            return state
    }
};