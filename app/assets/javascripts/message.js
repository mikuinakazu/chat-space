$(function() {
  function buildHTML(message){
    var image = message.image? `<img src="${message.image}">` : "";
    // if (message.image) {
    //   var image = `<img src="${message.image}">`;
    // } else {
    //   var image = ""
    // };
    var html = `<div class="chat_screen__content" data-id="${message.id}">
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
                    ${image}
                    </p>
                  </div>`
    return html;
  }

  function autoReload(){
    var lastContent = $('.chat_screen__content').last();
    var lastId = lastContent.data('id');

    var url = location.href;
    if (!(url.includes('groups' && 'messages'))){
      return
    };

    $.ajax({
      url: location.href,
      type: 'GET',
      data: {
        last_id: lastId
      },
      dataType: 'json'
    })
    .done(function(data) {
      data.forEach(function(datum) {
        var html = buildHTML(datum);
        $('.chat_screen').append(html)
      })
    })
    .fail(function() {
      alert('error');
    })
  }


  setInterval(function() {
    autoReload();
  }, 5000);

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
      $('.chat_screen').animate({ scrollTop:$('.chat_screen')[0].scrollHeight })
    })
    .fail(function() {
      alert('error');
    })
  })
})

