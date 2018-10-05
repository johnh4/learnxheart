class Api::CoursesController < ApplicationController
  load_and_authorize_resource
  respond_to :json

  def index
    courses = Course.all
    respond_with courses
  end

  def show
    respond_with @course
  end

  def create
    @course.educator_id = current_user.id
    if @course.save
      render json: @course, status: 201, location: [:api, @course]
    else
      render json: { errors: @course.errors }, status: 422
    end
  end

  def update
    if @course.update(course_params)
      render json: @course, status: 200, location: [:api, @course]
    else
      render json: { errors: @course.errors }, status: 422
    end
  end

  private

  def course_params
    params.require(:course).permit(:name)
  end
end
