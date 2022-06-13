class ForumSerializer < ActiveModel::Serializer
  attributes :id, :title, :image, :likes, :dislikes

  has_many :forum_posts
  belongs_to :user
end
