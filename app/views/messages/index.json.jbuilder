json.array! @differences do |difference|
  json.content   difference.content
  json.id        difference.id
  json.image     difference.image_url
  json.user_name difference.user.name
  json.date      difference.create_time
end
