class ForumPost < ApplicationRecord
    belongs_to :user
    belongs_to :forum
    delegate :username, to: :user, allow_nil: true
end
