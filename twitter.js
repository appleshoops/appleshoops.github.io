const UserID = "1560203265903833089"
const proxyURL = 'https://corsproxy.io/?' + encodeURIComponent(`https://api.twitter.com/2/users/${UserID}/tweets`);
const tweetURL = new URL(proxyURL);

const BearerToken = 'AAAAAAAAAAAAAAAAAAAAAJDUuQEAAAAAPUBLv2XYL32gzyqmONwebGEuIwc%3DkcZ5zslsHHKVS0Vuo2QCcoJC7y76U8ARDA3cByP8U26XTdOBmY';

const getUserTweets = async () => {
    let userTweets = [];
    let params = {
        "max_results": 15,
        "tweet.fields": "created_at",
        "expansions": "author_id",
    }

    Object.keys(params).forEach(key => tweetURL.searchParams.append(key, params[key]));

    const options = {
        headers: {
            "User-Agent": "v2UserTweetsJS",
            "authorization": `Bearer ${BearerToken}`
        }
    }

    let userName;
    
    console.log("Retrieving Tweets...")

    try {
        const response = await fetch(tweetURL, options);
        if (response.ok) {
            const userTweets = await response.json();
            console.log("WE GOT TWEETS!!!");
            return userTweets;
        } else {
            console.error("We have an error: ", await response.text(), response.status);
            return "No Tweets :("
        }
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

getUserTweets().then(tweets => console.log(tweets));