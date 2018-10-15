require 'rails_helper'

RSpec.describe Student, type: :model do
  it_behaves_like "a learnxheart user"

  context "associations" do
    it "can have educators" do
      educator = create(:educator)
      student = educator.students.create(attributes_for(:student))

      expect(student.educators).to include educator
    end

    it "can have card_student_relationships" do
      student = create(:student)
      # expect(student).to be_instance_of(Student)
      card_student_relationship = create(:card_student_relationship, student: student)
      expect(student.card_student_relationships).to include card_student_relationship
    end
  end
end