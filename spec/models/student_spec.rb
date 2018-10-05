require 'rails_helper'

RSpec.describe Student, type: :model do
  it_behaves_like "a learnxheart user"

  context "associations" do
    it "can have educators" do
      educator = create(:educator)
      student = educator.students.create(attributes_for(:student))

      expect(student.educators).to include educator
    end
  end
end