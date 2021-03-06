require 'rails_helper'

RSpec.describe Educator, type: :model do
  it_behaves_like "a learnxheart user"

  it "can have students" do
    educator = create(:educator)
    student = educator.students.create(attributes_for(:student))

    expect(educator.students).to include student
  end

  it "can have courses" do
    educator = create(:educator)
    expect {
      educator.courses.create(attributes_for(:course))
    }.to change(educator.courses, :count).by 1
  end
end