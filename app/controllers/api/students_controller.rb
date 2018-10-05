class Api::StudentsController < ApplicationController
  load_and_authorize_resource
  respond_to :json

  def create
    student = Student.new(student_params)
    if student.save
      render json: student, status: 201, location: [:api, student]
    else
      render json: { errors: student.errors }, status: 422
    end
  end

  def show
    student = Student.find(params[:id])
    respond_with student
  end

  def update
    student = Student.find(params[:id])
  
    if student.update(student_params)
      render json: student, status: 200, location: [:api, student]
    else
      render json: { errors: student.errors }, status: 422
    end
  end

  def destroy
    student = Student.find(params[:id])
    student.destroy
    head 204
  end

  private

  def student_params
    params.require(:student).permit(:email, :password, :password_confirmation)
  end
end

