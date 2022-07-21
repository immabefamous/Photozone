class AddDislikesToForumPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :forum_posts, :dislikes, :integer
  end
end
