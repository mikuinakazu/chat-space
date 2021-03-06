class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group
  # 文章も画像もない場合にはメッセージが保存されないようバリデーションをかける
  validates :content, presence: true, unless: :image?
  # image_uploaderをマウントする記述
  mount_uploader :image, ImageUploader

  def create_time
    created_at.strftime("%Y/%m/%d %H:%M")
  end
end
