class CreateWishTagRelationships < ActiveRecord::Migration[5.2]
  def change
    create_table :wish_tag_relationships do |t|
      t.references :wish, foreign_key: true
      t.references :tag, foreign_key: true

      t.timestamps
    end
  end
end
