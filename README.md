
  ## usersテーブル
	|Column|Type|Options|
	|------|----|-------|
	|name|string|null: false|
	|email|string|null: false|unique: true|
	|password|string|null: false|

	### Assosiation
	- has_many :groups, through: group_users
	- has_many :user_groups
	- has_many :messages


	## messagesテーブル
	|Column|Type|Options|
	|------|----|-------|
	|content|text|
	|image|string|
	|group_id|integer|foreign_key: true, index: true|
	|user_id|integer|foreign_key: true, index: true|

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
	- has_many :messages


	## user_groupsテーブル
	|Column|Type|Options|
	|------|----|-------|
	|user_id|integer|null: false, foreign_key: true|
	|group_id|integer|null: false, foreign_key: true|

	### Assosiation
	- has_many :users
	- has_many :groups

