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

  // $('.message-reply-form').on('submit', function(event) {
  //   event.preventDefault();
  //   $('.rmessage').append(`
  //     <div class="card white">
  //       <div class="card-content black-text">
  //         <div class="row">
  //           <div class="col s1">
  //             <img src="/images/${currentUser.avatar}" class="circle icon-avatar">
  //           </div>
  //           <div class="col s11">
  //             <strong>From: <a href="/users/${currentUser.id}">${currentUser.firstName} ${currentUser.lastName}</a></strong>
  //             <br><br>${$('textarea').val()}
  //             <br><br><em>Date: <span data-moment-format="LLL">${$.now()}</span></em>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   `)
  //   $(.message-reply-form textarea).val('');
  // });

});
