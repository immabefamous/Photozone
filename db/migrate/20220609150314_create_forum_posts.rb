class CreateForumPosts < ActiveRecord::Migration[7.0]
  def change
    create_table :forum_posts do |t|
      t.text :textarea
      t.string :image
      t.integer :user_id
      t.integer :forum_id

      t.timestamps
    end
  end
end
