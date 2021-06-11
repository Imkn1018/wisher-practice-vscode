class Wish < ApplicationRecord
  has_many :complete_reviews
  has_many :wish_tag_relations
  has_many :tags, through: :wish_tag_relations
  belogns_to:user

  attachment :image
end
