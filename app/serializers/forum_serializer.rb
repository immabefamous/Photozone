class ForumSerializer < ActiveModel::Serializer
  attributes :id, :title, :image, :likes, :dislikes

  belongs_to :user
  has_many :forum_posts
  
end
