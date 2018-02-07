$(function() {
  function buildHTML(message){
    if (message.image) {
      var image = `<img src="${message.image}">`;
    } else {
      var image = ""
    };
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
    var last_content = $('.chat_screen__content').last();
    var last_id = last_content.data('id');

    var url = location.href;
    console.log(url);
    if (!(url.includes('groups' && 'messages'))){
      return
    };

    $.ajax({
      url: location.href,
      type: 'GET',
      data: {
        last_id: last_id
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
  //5秒毎に自動更新する
  //今いるURLがmessages#indexならsetIntervalを呼び、そうでなければsetIntervalは解除する！！！
  // ページ移動した時にうまくいかない（リロードするとうまくいく）
  // var url = location.href
  // console.log(url)

  // if (url.includes('groups' && 'messages')) {
  setInterval(function() {
    autoReload();
  }, 5000);
  // }

  //sendボタンを押すとチャットを投稿する
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

