require 'rails_helper'

RSpec.describe Api::EducatorsController, type: :controller do

  describe "GET #show" do
    it "returns the educator" do
      educator = create(:educator)

      get :show, params: { id: educator.id }

      educator_response = json_response
      expect(educator_response[:email]).to eql educator.email
      expect(response.status).to eq 200
    end

    it "doesn't show to the token" do
      educator = create(:educator)

      get :show, params: { id: educator.id }

      educator_response = json_response
      # byebug
      expect(educator_response[:token]).to_not eql educator.token
      expect(response.status).to eq 200
    end
  end

  describe "PATCH #update" do
    context "when successfully updated" do
      it "renders the json representation for the updated educator" do
        educator = sign_in_educator

        patch :update, params: { id: educator.id,
                         educator: { email: "newmail@example.com" } }

        educator_response = json_response
        expect(educator_response[:email]).to eql "newmail@example.com"
        expect(response.status).to eq 200
      end

    end

    context "when is not created" do
      it "renders an errors json" do
        educator, educator_response = setup_and_update_educator

        expect(educator_response).to have_key(:errors)
        expect(response.status).to eq 422
      end

      it "renders the json errors on why the user could not be created" do
        educator, educator_response = setup_and_update_educator

        expect(educator_response[:errors][:email]).to include "is invalid"
     end
    end
  end

  describe "DELETE #destroy" do
    it "deletes the educator" do
      educator = sign_in_educator

      expect {
        delete :destroy, params: { id: educator.id }
      }.to change(Educator, :count).by -1

      expect(response.status).to eq 204
    end
  end
end

def setup_and_update_educator
  educator = sign_in_educator

  patch :update, params: { id: educator.id,
                    educator: { email: "bademail.com" } }

  educator_response = json_response
  [ educator, educator_response ]
end