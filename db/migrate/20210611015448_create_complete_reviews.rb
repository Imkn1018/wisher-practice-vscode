class CreateCompleteReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :complete_reviews do |t|
      t.integer :user_id
      t.integer :wish_id
      t.string :review_title
      t.text :review
      t.integer :satisfy
      t.string :complete_image_id

      t.timestamps
    end
  end
end
