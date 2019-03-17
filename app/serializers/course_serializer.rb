class CourseSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :created_at, :updated_at, :educator_id

  has_many :course_student_relationships
  belongs_to :educator
end

