class Educator < User
  has_many :educator_student_relationships, foreign_key: :educator_id
  has_many :students, through: :educator_student_relationships, source: :student
end