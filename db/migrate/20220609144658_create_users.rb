class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.text :name
      t.text :username
      t.text :password
      t.text :image
      t.boolean :subscription

      t.timestamps
    end
  end
end
