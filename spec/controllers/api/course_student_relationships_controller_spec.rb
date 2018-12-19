require 'rails_helper'

RSpec.describe Api::CourseStudentRelationshipsController, type: :controller do
  describe "GET #index" do
    it "returns the correct course_student_relationships" do
      student = sign_in_student
      course_student_relationship_1 = create(:course_student_relationship)
      course_student_relationship_2 = create(:course_student_relationship)

      get :index

      course_student_relationships_response = json_response
      ids = ids_from_response course_student_relationships_response
      expect(ids).to match [course_student_relationship_1.id, course_student_relationship_2.id]
      expect(course_student_relationships_response.length).to be 2
      expect(response.status).to eq 200
    end
  end

  describe "POST #create" do
    it "creates the course_student_relationship" do
      student = sign_in_student
      csr = build(:course_student_relationship, student: student)

      expect {
        post :create, params: { student_id: student.id, course_id: csr.course.id }
      }.to change(CourseStudentRelationship, :count).by 1

      expect(response.status).to eq 201
    end
  end

  describe "DELETE #destroy" do
    context "when the user owns the csr" do
      it "deletes the course_student_relationship" do
        student = sign_in_student
        csr = create(:course_student_relationship, student: student)

        expect {
          delete :destroy, params: { id: csr.id }
        }.to change(CourseStudentRelationship, :count).by -1

        expect(response.status).to eq 204
      end
    end

    context "when the user doesn't own the csr" do
      it "doesn't delete the course_student_relationship" do
        student = sign_in_student
        csr = create(:course_student_relationship, student: create(:student))

        expect {
          delete :destroy, params: { id: csr.id }
        }.to_not change(CourseStudentRelationship, :count)

        expect(response.status).to eq 403
      end
    end
  end
end

def ids_from_response response
  response.map { |e| e[:id] }
end