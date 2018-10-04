class Student < User
  has_many :educator_student_relationships, foreign_key: :student_id
  has_many :educators, through: :educator_student_relationships, source: :educator
end