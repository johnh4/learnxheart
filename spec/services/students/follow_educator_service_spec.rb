require 'rails_helper'

RSpec.describe Students::FollowEducatorService, type: :service do
  it "can create a relationship between students and educators" do
    student = create(:student)
    educator = create(:educator)
    service = Students::FollowEducatorService.new(student, educator)
    expect {
      service.execute
    }.to change(student.educators, :count).by 1
  end
end