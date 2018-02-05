$(function() {
    function buildHTML(message){
    var html = `<div class="chat_screen__content">
                    <p class="chat_screen__content--name">
                    ${message.user_name}
                    </p>
                    <p class="chat_screen__content--date">
                    ${message.date}
                    </p>
                    <p class="chat_screen__text">
                    ${message.content}
                    </p>
                    <p class="chat_screen__image">
                      <image src="${message.image}">
                    </p>
                  </div>`
    return html;
  }

  $('form').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.chat_screen').append(html)
      $('form').val('')
      $('.chat_screen').animate({ scrollTop:$('.chat_screen__content')[0].scrollHeight })
    })
    .fail(function() {
      alert('error');
    })
  })
})