class ForumPostSerializer < ActiveModel::Serializer
  attributes :id, :textarea, :image 

  belongs_to :forum
end
