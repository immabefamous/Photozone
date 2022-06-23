class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :likes, :user

  belongs_to :pic_post
  belongs_to :user
end
