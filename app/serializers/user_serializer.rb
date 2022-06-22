class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :image, :password, :name

  has_many :pic_posts
  has_many :comments
  has_many :forums
  # has_many :forum_posts
end
