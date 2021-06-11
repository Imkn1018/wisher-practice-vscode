class Tag < ApplicationRecord
  has_many :wish_tag_relations
  has_many :wishes, through: :wish_tag_relations
  belongs_to :user

  attachment :image
end
