require 'rails_helper'

RSpec.describe Api::EducatorStudentRelationshipsController, type: :controller do
  describe "GET #index" do
    it "returns the correct educator_student_relationships" do
      student = sign_in_student
      educator_student_relationship_1 = create(:educator_student_relationship)
      educator_student_relationship_2 = create(:educator_student_relationship)

      get :index

      educator_student_relationships_response = json_response
      ids = ids_from_response educator_student_relationships_response
      expect(ids).to match [educator_student_relationship_1.id, educator_student_relationship_2.id]
      expect(educator_student_relationships_response.length).to be 2
      expect(response.status).to eq 200
    end
  end

  describe "POST #create" do
    it "creates the educator_student_relationship" do
      student = sign_in_student
      esr = build(:educator_student_relationship, student: student)

      expect {
        post :create, params: { student_id: student.id, educator_id: esr.educator.id }
      }.to change(EducatorStudentRelationship, :count).by 1

      expect(response.status).to eq 201
    end
  end

  describe "DELETE #destroy" do
    context "when the user owns the esr" do
      it "deletes the educator_student_relationship" do
        student = sign_in_student
        esr = create(:educator_student_relationship, student: student)

        expect {
          delete :destroy, params: { id: esr.id }
        }.to change(EducatorStudentRelationship, :count).by -1

        expect(response.status).to eq 204
      end
    end

    context "when the user doesn't own the esr" do
      it "doesn't delete the educator_student_relationship" do
        student = sign_in_student
        esr = create(:educator_student_relationship, student: create(:student))

        expect {
          delete :destroy, params: { id: esr.id }
        }.to_not change(EducatorStudentRelationship, :count)

        expect(response.status).to eq 403
      end
    end
  end
end

def ids_from_response response
  response.map { |e| e[:id] }
end