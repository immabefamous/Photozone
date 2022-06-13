class Comment < ApplicationRecord
    belongs_to :pic_post
    belongs_to :user
end
