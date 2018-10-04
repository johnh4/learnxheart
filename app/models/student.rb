class Student < User
  has_many :educator_student_relationships, foreign_key: :student_id
  has_many :educators, through: :educator_student_relationships, source: :educator

  has_many :course_user_relationships, foreign_key: :user_id, dependent: :destroy
  has_many :courses, through: :course_user_relationships
end