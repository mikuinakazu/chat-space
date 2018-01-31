
  ## usersテーブル
	|Column|Type|Options|
	|------|----|-------|
	|name|string|null: false|
	|email|string|null: false|unique: true|
	|password|string|null: false|

	### Assosiation
	- has_many :groups, through: group_users
	- has_many :user_groups
	- has_many :comments


	## commentsテーブル
	|Column|Type|Options|
	|------|----|-------|
	|body|text|
	|image|string|
	|group_id|integer|null: false, foreign_key: true|
	|user_id|integer|null: false, foreign_key: true|

	### Assosiation
	- belongs_to :user
	- belongs_to :group


	## groupsテーブル
	|Column|Type|Options|
	|------|----|-------|
	|name|string|null: false|

	### Assosiation
	- has_many :users, through: group_users
	- has_many :user_groups
	- has_many :comments


	## user_groupsテーブル
	|Column|Type|Options|
	|------|----|-------|
	|user_id|integer|null: false, foreign_key: true|
	|group_id|integer|null: false, foreign_key: true|

	### Assosiation
	- has_many :users
	- has_many :groups

