class Comment < ApplicationRecord
    belongs_to :user
    belongs_to :pic_post
end
