require 'rails_helper'

RSpec.describe Api::SessionsController, type: :controller do
  describe "POST #create" do
    context "when the credentials are correct" do

      it "returns the user record corresponding to the given credentials" do
        user = post_with_correct_credentials
        user.reload
        expect(json_response[:token]).to eql user.token
      end

      it "responds with 200" do
        user = post_with_correct_credentials
        expect(response.status).to eq 200
      end
    end

    context "when the credentials are incorrect" do
      it "returns a json with an error" do
        post_with_incorrect_credentials
        expect(json_response[:errors]).to eql "Invalid email or password"
      end

      # it { should respond_with 422 }
      it "responds with 422" do
        post_with_incorrect_credentials
        expect(response.status).to eq 422
      end
    end
  end

  describe "DELETE #destroy" do
    it "responds with 204" do
      user = create(:user)
      sign_in user
      delete :destroy, params: { id: user.token }
    end
  end

end

def post_with_correct_credentials
  user = create(:educator)
  credentials = { email: user.email, password: user.password }
  post :create, params: { session: credentials }
  user
end

def post_with_incorrect_credentials
  user = create(:educator)
  credentials = { email: user.email, password: user.password + "fake" }
  post :create, params: { session: credentials }
  user
end