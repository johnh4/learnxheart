class Api::CourseStudentRelationshipsController < ApplicationController
  load_and_authorize_resource
  respond_to :json

  def index
    render json: @course_student_relationships, status: 200
  end

  def create
    if @course_student_relationship.save
      render json: @course_student_relationship,
             status: 201,
             location: [:api, @course_student_relationship]
    else
      render json: { errors: @course_student_relationship.errors },
             status: 422
    end
  end

  def destroy
    @course_student_relationship.destroy
    head 204
  end

  private

  def course_student_relationship_params
    params.require(:course_student_relationship).permit(:course_id, :student_id)
  end

end
