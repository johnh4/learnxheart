class Api::SessionsController < ApplicationController
  authorize_resource class: false

  def create
    user_password = params[:session][:password]
    user_email = params[:session][:email]
    user = user_email.present? && User.find_by(email: user_email)

    if (user.present? && (user.valid_password? user_password))
      sign_in user, store: false
      user.generate_authentication_token!
      user.save
      render json: user,
             status: 200,
             location: [:api, user],
             show_token: true
    else
      render json: { errors: "Invalid email or password" }, status: 422
    end
  end

  def destroy
    current_user.generate_authentication_token!
    current_user.save
    head 204
  end
end
