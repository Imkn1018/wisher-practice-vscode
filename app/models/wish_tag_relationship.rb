class WishTagRelationship < ApplicationRecord
  belongs_to :wish
  belongs_to :tag
end
