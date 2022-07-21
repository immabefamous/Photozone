class AddLikesToForumPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :forum_posts, :likes, :integer
  end
end
