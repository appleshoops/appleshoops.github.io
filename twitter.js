const needle = require('needle');

const UserID = "1560203265903833089"
const tweetURL = `https://api.twitter.com/2/users/${UserID}/tweets`;

const BearerToken = process.env.BearerToken;

const getUserTweets = async () => {
    let userTweets = [];
    let params = {
        "max_results": 15,
        "tweet.fields": "created_at",
        "expansions": "author_id"
    }

    const options = {
        headers: {
            "User-Agent": "v2UserTweetsJS",
            "authorization": `Bearer ${BearerToken}`
        }
    }

    let userName;
    
    console.log("Retrieving Tweets...")

    try {
        const response = await needle('get', tweetURL, params, options);
        if (response.statusCode === 200) {
            userTweets = (response.body);
            console.log("WE GOT THE TWEETS WOOOOOO")
        } else {
            userTweets = "No Tweets Or Something"
            console.error("No Twwets :(", response.body, response.statusCode)
        }
    } catch (error) {
        console.error("Error:", error)
    }

    return userTweets;
}

getUserTweets().then(tweets => console.log(tweets));