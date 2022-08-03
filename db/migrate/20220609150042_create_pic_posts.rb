class CreatePicPosts < ActiveRecord::Migration[7.0]
  def change
    create_table :pic_posts do |t|
      t.text :title
      t.text :image
      t.integer :likes
      t.integer :dislikes
      t.integer :user_id

      t.timestamps
    end
  end
end
