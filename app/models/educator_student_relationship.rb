class EducatorStudentRelationship < ApplicationRecord
  belongs_to :student
  belongs_to :educator
end
