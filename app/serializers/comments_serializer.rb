class CommentsSerializer < ActiveModel::Serializer
  attributes :id, :comment, :likes, :dislikes, :username

  belongs_to :user
  belongs_to :pic_post
end
