class Forum < ApplicationRecord
    belongs_to :user
    has_many :forum_posts

end
