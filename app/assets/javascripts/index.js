$(document).on('turbolinks:load', function() {
  $(function() {

    var search_list = $('.chat-group-user.clearfix');

    function appendUser(user) {
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.user_name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.user_id}" data-user-name="${user.user_name}">追加</a>
                  </div>`
      search_list.append(html);
    }

    function appendNoUser(user) {
      var html = `<div class="chat-group-user clearfix">${ user }</div>`
      search_list.append(html);
    }

    function addUser(name, id) {
      var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                    <input name='group[user_ids][]' type='hidden' value='${id}'>
                    <p class='chat-group-user__name'>${name}</p>
                    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                  </div>`
      search_list.append(html);
    }
    //ユーザーが検索された時
    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();

      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users) {
        $(".chat-group-user.clearfix").empty();
        if (users.length !== 0) {
          users.forEach(function(user) {
            appendUser(user)
          })
          //追加ボタンが押されたら・・・
          $(".user-search-add").on("click", function() {
            name = $(this).attr('data-user-name');
            id = $(this).attr('data-user-id');
            addUser(name, id);
            $(this).parent().remove();
              //削除ボタンが押されたら・・・
              $('.user-search-remove').on('click', function() {
              $(this).parent().remove();
            })
          })
        } else {
          appendNoUser("一致するユーザーはいません");
        }
      })
      .fail(function() {
        alert("ユーザー検索に失敗しました");
      })
    });
  });
});
