class Wish < ApplicationRecord
  has_many :complete_reviews
  has_many :wish_tag_relationships, dependent: :destroy
  has_many :tags, through: :wish_tag_relationships
  belongs_to:user, required: true

  attachment :wish_image

  def save_tag(tags,current_user)
    # タグテーブルのtag_nameカラムの一覧を取り出す
    current_tags = tags.pluck(:tag_name) unless tags.nil?
    # 既存のタグの配列から配列を除外
    old_tags = current_tags - tags
    #
    new_tags = tags - current_tags

    old_tags.each do |old|
      tags.delete Tag.find_by(tag_name: old)
    end

    new_tags.each do |new|
      new_tag = Tag.find_or_create_by(tag_name: new)
      new_tag.user = current_user
      self.tags << new_tag
    end
  end
end
