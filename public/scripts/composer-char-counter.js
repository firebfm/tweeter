$(document).ready(function() {
  $("#tweet-text").on('keyup', function() {
    // max characters - input box length
    const charMax = 140;
    let charLeft = charMax - $(this).val().length;

    // show character count
    const counter = $(this).siblings().children('.counter');
    counter.text(charLeft);

    // class to make negative numbers red
    if (charLeft < 0) {
      counter.addClass('negativeNum');
    } else {
      counter.removeClass('negativeNum');
    }
  })
});