class AddDislikesToComments < ActiveRecord::Migration[7.0]
  def change
    add_column :comments, :dislikes, :integer
  end
end
