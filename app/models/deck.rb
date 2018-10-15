class Deck < ApplicationRecord
  belongs_to :course
  has_many :cards
  has_many :card_student_relationships
end
