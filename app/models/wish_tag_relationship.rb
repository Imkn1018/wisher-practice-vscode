class WishTagRelationship < ApplicationRecord
  belongs_to :wish
  belongs_to :tag
  validates :wish_id, presence: true
  validates :tag_id, presence: true
end
