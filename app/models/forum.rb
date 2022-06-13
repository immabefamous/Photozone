class Forum < ApplicationRecord
    has_many :forum_posts
    belongs_to :user
end
