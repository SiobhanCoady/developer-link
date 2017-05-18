$('.datepicker').pickadate({
  selectMonths: true, // Creates a dropdown to control month
  selectYears: 15 // Creates a dropdown of 15 years to control year
});

$(document).ready(function() {
  $('select').material_select();

  if ($('input:radio').hasClass('dev-checked')) {
    $('.dev-options').removeClass('hidden');
  } else if ($('input:radio').hasClass('np-checked')) {
    $('.np-options').removeClass('hidden');
  }

  // format moment dates
  $("[data-moment-format]").each((i, el) => {
    const format = $(el).data("moment-format")
    const date = $(el).html()
    $(el).html(moment(date).format(format))
  })

});

$('#developer').on('click', function(event) {
  $('.dev-options').removeClass('hidden');
  $('.np-options').addClass('hidden');
});

$('#nonprofit').on('click', function(event) {
  $('.np-options').removeClass('hidden');
  $('.dev-options').addClass('hidden');
});
