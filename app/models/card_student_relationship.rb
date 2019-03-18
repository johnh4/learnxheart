class CardStudentRelationship < ApplicationRecord
  belongs_to :student
  belongs_to :card
  belongs_to :deck
end
