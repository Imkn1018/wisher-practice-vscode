class Wish < ApplicationRecord
  has_many :complete_reviews
  has_many :wish_tag_relationships, dependent: :destroy
  has_many :tags, through: :wish_tag_relationships
  belongs_to:user, required: true

  attachment :wish_image

  def save_tag(sent_tags)
    current_tags = self.tags.pluck(:tag_name) unless self.tags.nil?
    old_tags = current_tags - sent_tags
    new_tags = sent_tags - current_tags

    old_tags.each do |old|
      self.tags.delete Tag.find_by(tag_name: old)
    end

    new_tags.each do |new|
      new_tag = Tag.find_or_create_by(tag_name: new)
      # self.tags << new_tag
    end
  end
end
