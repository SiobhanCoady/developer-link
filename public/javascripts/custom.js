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

});
