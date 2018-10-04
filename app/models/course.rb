class Course < ApplicationRecord
  belongs_to :educator

  has_many :course_user_relationships, dependent: :destroy
  has_many :students, through: :course_user_relationships, source: :user
end
