class Course < ApplicationRecord
  belongs_to :educator

  has_many :course_student_relationships, dependent: :destroy
  has_many :students, through: :course_student_relationships

  has_many :decks
end
