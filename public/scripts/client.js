/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  // escaping user input to prevent XSS
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // loop through database and create tweets
  // prepend for lastest date approach
  const renderTweets = function(tweetsArr) {
    $('#load-tweets-section').empty();
    for (let tweet of tweetsArr) {
      const $tweet = createTweetElement(tweet);
      $('#load-tweets-section').prepend($tweet);
    }
  };

  // generate single tweet html
  const createTweetElement = function(tweet) {
    const date = new Date(tweet.created_at).toLocaleString();

    let $tweet = `<article class="tweet">
                    <header>
                      <div class="avatar">
                        <img src="${escape(tweet.user.avatars)}" width="50" height="50">
                        <span class="display-name">${escape(tweet.user.name)}</span>
                      </div>
                      <span class="handle">${escape(tweet.user.handle)}</span>
                    </header>
                    <p>
                      ${escape(tweet.content.text)}
                    </p>
                    <div class="line"></div>
                    <footer>
                      <span>${date}</span>
                      <div class="icons">
                        <i class="fas fa-flag"></i>
                        <i class="fas fa-retweet"></i>
                        <i class="fas fa-heart"></i>
                      </div>
                    </footer>
                  </article>`;
    return $tweet;
  };

  // ajax get request
  const loadTweets = function() {
    const url = 'http://localhost:8080/tweets';
    $.ajax({
      method: 'GET',
      url: url,
    })
      .then((result) => {
        renderTweets(result);
      })
      .catch((err) => console.log(err));
  };

  // On form submit, do ajax post request
  $('#new-tweet-form').on('submit', function(event) {
    // stop the form from being submitted
    event.preventDefault();
    let $errorMsg = $('.error-msg');
    $errorMsg.slideUp();

    // input box
    // serialize - turns into query string format, used for POST
    const $textBox = $(this).children('#tweet-text');
    const $textBoxSerial = $(this).children('#tweet-text').serialize();

    // form validation
    const charMax = 140;
    const charLeft = Number($(this).children('div').children('.counter').val());

    if (charLeft === charMax) {
      $errorMsg.slideDown();
      return $errorMsg.children('p').children('span').text(`Error: Empty string detected`);
    }

    if (charLeft < 0) {
      $errorMsg.slideDown();
      return $errorMsg.children('p').children('span').text(`Error: Exceeded ${charMax} character limit`);
    }

    // post a tweet
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $textBoxSerial
    })
      .then(() => {
        $(this).children('div').children('.counter').val(charMax);
        loadTweets(); // ajax get request without refreshing
      })
      .catch((err) => {
        console.log(err);
      });
    $textBox.val('');
  });
  // load initial tweets so html won't be empty
  loadTweets();
});