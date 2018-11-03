class Api::EducatorsController < ApplicationController
  load_and_authorize_resource
  respond_to :json

  def index
    render json: @educators, status: 200
  end

  def create
    if @educator.save
      render json: @educator, status: 201, location: [:api, @educator]
    else
      render json: { errors: @educator.errors }, status: 422
    end
  end

  def show
    respond_with @educator
  end

  def update
    if @educator.update(educator_params)
      render json: @educator, status: 200, location: [:api, @educator]
    else
      render json: { errors: @educator.errors }, status: 422
    end
  end

  def destroy
    @educator.destroy
    head 204
  end

  private

  def educator_params
    params.require(:educator).permit(:email, :password, :password_confirmation)
  end

end