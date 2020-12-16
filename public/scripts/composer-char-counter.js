$(document).ready(function() {
  $("#tweet-text").on('keyup', function() {
    const charMax = 140;
    let charLeft = charMax - $(this).val().length;

    const counter = $(this).siblings().children('.counter');
    counter.text(charLeft);

    if (charLeft < 0) {
      counter.addClass('negativeNum');
    } else {
      counter.removeClass('negativeNum');
    }
  })
});