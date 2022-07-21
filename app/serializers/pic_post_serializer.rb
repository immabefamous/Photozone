class PicPostSerializer < ActiveModel::Serializer
  attributes :id, :title, :image, :likes, :dislikes

  belongs_to :user
  has_many :comments
end
