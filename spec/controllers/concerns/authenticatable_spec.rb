require 'rails_helper'

class Authentication
  include Authenticatable

  def request
  end
end

describe Authenticatable do
  let(:authentication) { Authentication.new }
  subject { authentication }

  describe "#current_user" do
    it "returns the user from the authorization header" do
      user = create(:user)
      request.headers["Authorization"] = user.token
      expect(authentication).to receive(:request).and_return(request)
      expect(authentication.current_user.token).to eql user.token
    end
  end

  describe "#current_educator" do
    it "returns the educator from the authorization header" do
      educator = create(:educator)
      request.headers["Authorization"] = educator.token
      expect(authentication).to receive(:request).and_return(request)
      expect(authentication.current_educator.token).to eql educator.token
    end
  end

  describe "#current_student" do
    it "returns the student from the authorization header" do
      student = create(:student)
      request.headers["Authorization"] = student.token
      expect(authentication).to receive(:request).and_return(request)
      expect(authentication.current_student.token).to eql student.token
    end
  end

  describe "#user_signed_in?" do
    it "is true when a user is signed in" do
      user = sign_in_user
      expect(authentication).to receive(:current_user).and_return(user)
      expect(authentication.user_signed_in?).to eq true
    end

    it "is false when no user is signed in" do
      user = create(:user)
      expect(authentication).to receive(:current_user).and_return(nil)
      expect(authentication.user_signed_in?).to eq false
    end
  end

  describe "#educator_signed_in?" do
    it "is true when an educator is signed in" do
      educator = sign_in_educator
      expect(authentication).to receive(:current_user).and_return(educator).twice
      expect(authentication.educator_signed_in?).to eq true
    end

    it "is false when an educator isn't signed in" do
      educator = create(:educator)
      expect(authentication).to receive(:current_user).and_return(nil)
      expect(authentication.educator_signed_in?).to eq false
    end

    it "is false when a student is signed in" do
      student = create(:student)
      expect(authentication).to receive(:current_user).and_return(student).twice
      expect(authentication.educator_signed_in?).to eq false
    end
  end

  describe "#student_signed_in?" do
    it "is true when a student is signed in" do
      student = sign_in_student
      expect(authentication).to receive(:current_user).and_return(student).twice
      expect(authentication.student_signed_in?).to eq true
    end

    it "is false when a student isn't signed in" do
      student = create(:student)
      expect(authentication).to receive(:current_user).and_return(nil)
      expect(authentication.student_signed_in?).to eq false
    end

    it "is false when an educator is signed in" do
      educator = create(:educator)
      expect(authentication).to receive(:current_user).and_return(educator).twice
      expect(authentication.student_signed_in?).to eq false
    end
  end
end
