const initState = {
    mainTweet: {
        id: 1,
        urlAvatar: "https://pbs.twimg.com/profile_images/552490918989668352/ywlPHVTJ_400x400.jpeg",
        displayName: "JBThong",
        author: '@Nguynnh74289770',
        time: 1543641338,
        content: 'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, ' +
            'EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, ' +
            'FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR ' +
            'COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF ' +
            'CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE ' +
            'OR OTHER DEALINGS IN THE SOFTWARE.',
        likesCount: 2,
        commentCount: 2000,
        toUser: '@Nguynnh74289770',
    },
    otherTweets:[
    {
        id: 2,
        urlAvatar: "https://pbs.twimg.com/profile_images/552490918989668352/ywlPHVTJ_400x400.jpeg",
        displayName: "JBThong",
        author: '@Nguynnh74289770',
        time: 1543641338,
        content: 'This is a comment tweet',
        likesCount: 2,
        commentCount:2,
        toUser:'@Nguynnh74289770',
    },
    {
        id: 3,
        urlAvatar: "https://pbs.twimg.com/profile_images/552490918989668352/ywlPHVTJ_400x400.jpeg",
        displayName: "Tien Nguyen",
        author: '@Nguynnh74289770',
        time: 1543641338,
        content: 'and again',
        likesCount: 5,
        commentCount:20,
        toUser:'@Nguynnh74289770',
    },
    ]
}

export default (state = initState, action) => {
    switch (action.type) {
        default:
            return state
    }
};