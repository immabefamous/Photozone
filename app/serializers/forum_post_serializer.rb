class ForumPostSerializer < ActiveModel::Serializer
  attributes :id, :textarea, :image, :likes, :dislikes, :username, :user

  belongs_to :user
  belongs_to :forum
end
