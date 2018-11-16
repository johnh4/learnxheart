require 'rails_helper'

RSpec.describe Api::StudentsController, type: :controller do
  describe "GET #show" do
    it "returns the student" do
      student = sign_in_student

      get :show, params: { id: student.id }

      student_response = json_response
      expect(student_response[:email]).to eql student.email
      expect(response.status).to eq 200
    end

    it "doesn't show to the token" do
      student = create(:student)

      get :show, params: { id: student.id }

      student_response = json_response
      expect(student_response[:token]).to_not eql student.token
      expect(response.status).to eq 200
    end
  end

  describe "PATCH #update" do
    context "when successfully updated" do
      it "renders the json representation for the updated student" do
        student = sign_in_student

        patch :update, params: { id: student.id,
                         student: { email: "newmail@example.com" } }

        student_response = json_response
        expect(response.status).to eq 200
        expect(student_response[:email]).to eql "newmail@example.com"
      end

    end

    context "when is not created" do
      it "renders an errors json" do
        student, student_response = setup_and_update_student

        expect(response.status).to eq 422
        expect(student_response).to have_key(:errors)
      end

      it "renders the json errors on why the user could not be created" do
        student, student_response = setup_and_update_student

        expect(student_response[:errors][:email]).to include "is invalid"
     end
    end
  end

  describe "DELETE #destroy" do
    it "deletes the student" do
      student = sign_in_student

      expect {
        delete :destroy, params: { id: student.id }
      }.to change(Student, :count).by -1

      expect(response.status).to eq 204
    end
  end
end

def setup_and_update_student
  student = sign_in_student

  patch :update, params: { id: student.id,
                    student: { email: "bademail.com" } }

  student_response = json_response
  [ student, student_response ]
end