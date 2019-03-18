RSpec.shared_examples "a learnxheart user" do
  it { is_expected.to respond_to(:email) }
  it { is_expected.to respond_to(:first_name) }
  it { is_expected.to respond_to(:last_name) }
  it { is_expected.to respond_to(:token) }

  describe "#generate_authentication_token!" do
    it "generates a token" do
      user = build(:user, token: nil)
      user.generate_authentication_token!
      expect(user.token).to_not be_blank
    end
  end
end