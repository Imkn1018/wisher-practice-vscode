class CreateWishes < ActiveRecord::Migration[5.2]
  def change
    create_table :wishes do |t|
      t.integer :user_id
      t.string :wish_title
      t.text :memo
      t.string :wish_image_id
      t.timestamp :span
      t.integer :difficutly
      t.boolean :isCompleted, default: false, null: false
      t.string :url

      t.timestamps
    end
  end
end
