/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function(tweetsArr) {
    for (let tweet of tweetsArr) {
      const $tweet = createTweetElement(tweet)
      $('#tweets-container').append($tweet);
    }
  };

  const createTweetElement = function(tweet) {
    const time = new Date(tweet.created_at).toLocaleString();

    let $tweet = `<article class="tweet">
                    <header>
                      <div class="avatar">
                        <img src="${tweet.user.avatars}" width="50" height="50">
                        <span class="display-name">${tweet.user.name}</span>
                      </div>
                      <span class="handle">${tweet.user.handle}</span>
                    </header>
                    <p>
                      ${tweet.content.text}
                    </p>
                    <div class="line"></div>
                    <footer>
                      <span>${time}</span>
                      <div class="icons">
                        <i class="fas fa-flag"></i>
                        <i class="fas fa-retweet"></i>
                        <i class="fas fa-heart"></i>
                      </div>
                    </footer>
                  </article>`
    return $tweet;
  };

  renderTweets(data);
});