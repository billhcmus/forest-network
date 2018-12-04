const initState = {
    listTweet:[
        {
            id:1,
            urlAvatar: "https://pbs.twimg.com/profile_images/552490918989668352/ywlPHVTJ_400x400.jpeg",
            displayName: "JBThong",
            author:'@Nguynnh74289770',
            time:1543641338,
            content:'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, ' +
                'EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, ' +
                'FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR ' +
                'COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF ' +
                'CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE ' +
                'OR OTHER DEALINGS IN THE SOFTWARE.',
            likesCount:2,
            comments: [
                {
                    id: 1,
                    content: "Lorens"
                }
            ]
        },
        {
            id:2,
            urlAvatar: "https://pbs.twimg.com/profile_images/552490918989668352/ywlPHVTJ_400x400.jpeg",
            author:'@Nguynnh74289770',
            displayName: "JBThong",
            time:15436414000,
            content:'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, ' +
                'EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, ' +
                'FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR ' +
                'COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF ' +
                'CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE ' +
                'OR OTHER DEALINGS IN THE SOFTWARE.',
            likesCount:10,
            comments: [
                {
                    id: 1,
                    content: "Lorens"
                },
                {
                    id: 2,
                    content: "Lorens"
                },
                {
                    id: 3,
                    content: "Lorens"
                }
            ]
        },
        {
            id:2,
            urlAvatar: "https://pbs.twimg.com/profile_images/552490918989668352/ywlPHVTJ_400x400.jpeg",
            author:'@Nguynnh74289770',
            displayName: "JBThong",
            time:15436414000,
            content:'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, ' +
                'EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, ' +
                'FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR ' +
                'COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF ' +
                'CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE ' +
                'OR OTHER DEALINGS IN THE SOFTWARE.',
            likesCount:10,
            comments: [
                {
                    id: 1,
                    content: "Lorens"
                },
                {
                    id: 2,
                    content: "Lorens"
                },
                {
                    id: 3,
                    content: "Lorens"
                }
            ]
        }
    ]
};


export default (state = initState, action) => {
    switch (action.type) {
        default:
            return state
    }
};