function showRating(rating) {
  let string = '';
  for (let i = 0; i < rating; i++) {
    string += `<i class="material-icons tiny">star</i>`;
  }
  return string;
}

$(document).ready(function() {
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });

  $('select').material_select();
  $('.modal').modal();

  // format moment dates
  $("[data-moment-format]").each((i, el) => {
    const format = $(el).data("moment-format")
    const date = $(el).html()
    $(el).html(moment(date).format(format))
  });

  $('.reset-form').on('click', function(event) {
    $('.search').val('');
    $('.charity-form').val('');
    $('.technology-form').val('');
    $('.language-form').val('');
    $('.search-form').submit();
  });

  $('#send-message').on('click', function(event) {
    $('#send-message-form').submit();
  })

  $('.message-reply-form').on('submit', function(event) {
    event.preventDefault();
    const payload = {body: $('#response-body').val()};
    const userID = $('.messsage-id').attr('id');
    return $.ajax({
      type: "POST",
      url: `/users/${userID}/messages/${event.target.id}/responses`,
      data: payload
    }).then((data, err) => {
      $('.rmessage').append(`
        <div class="card white">
          <div class="card-content black-text">
            <div class="row">
              <div class="col s1">
                <img src="/images/${data.sender.avatar}" class="circle icon-avatar">
              </div>
              <div class="col s11">
                <strong>From: <a href="/users/${data.sender.id}">${data.sender.firstName} ${data.sender.lastName}</a></strong>
                <br><br>${payload.body}
                  <br><br><em>Date: ${data.timestamp}</em>
                </div>
              </div>
            </div>
          </div>
          `)
      $('.message-reply-form textarea').val('');
    });
  });

  $('.review-form').on('submit', function(event) {
    event.preventDefault();
    const payload = {
      body: $('#review-body').val(),
      rating: $('#review-rating').val()
    };
    const userID = $('.review-id').attr('id');
    return $.ajax({
      type: "POST",
      url: `/users/${userID}/reviews`,
      data: payload
    }).then((data, err) => {
      $('.reviews-list').has('p').html('');
      $('.reviews-list').prepend(`
        <div class="card white">
          <div class="card-content black-text">
            ${showRating(payload.rating)}
            <br><br>${payload.body}
            <br><br><a href="/users/${data.reviewer.id}">${data.reviewer.firstName} ${data.reviewer.lastName}</a>
            <br><br><em>${data.timestamp}</em>
          </div>
        </div>
      `)
      $('#review-body').val('');
      $('#review-rating').val('');
    });
  });

});
