class EducatorStudentRelationship < ApplicationRecord
  belongs_to :student, class_name: "User"
  belongs_to :educator, class_name: "User"
end
