class CompleteReview < ApplicationRecord
  belongs_to :user
  belongs_to :wish

  attachment :complete_image
end
