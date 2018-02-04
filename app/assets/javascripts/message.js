$(function() {
    function buildHTML(message){
      console.log(message.image)
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
    console.log(this);
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
    })
    .fail(function() {
      alert('error');
    })
  })
})