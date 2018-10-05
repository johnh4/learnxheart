class Deck < ApplicationRecord
  belongs_to :course
  has_many :cards
end
