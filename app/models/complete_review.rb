class CompleteReview < ApplicationRecord
  belongs_to :user
  belongs_to :wish

  attachment :image
end
