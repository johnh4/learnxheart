class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :token, uniqueness: true

  before_create :generate_authentication_token!

  def educator?
    type == "Educator"
  end

  def student?
    type == "Student"
  end

  def generate_authentication_token!
    begin
      self.token = Devise.friendly_token
    end# while self.class.exists?(token: token)
  end
end
