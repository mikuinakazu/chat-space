json.array! @messages do |message|
  json.content message.content
  json.id message.user.id
  json.image message.image_url
  json.user_name message.user.name
  json.date message.create_time
end