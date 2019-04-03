class Api::EducatorStudentRelationshipsController < ApplicationController
  load_and_authorize_resource
  respond_to :json

  def index
    render json: @educator_student_relationships, status: 200
  end

  def create
    if @educator_student_relationship.save
      render json: @educator_student_relationship,
             status: 201,
             location: [:api, @educator_student_relationship]
    else
      render json: { errors: @educator_student_relationship.errors },
             status: 422
    end
  end

  def destroy
    @educator_student_relationship.destroy
    head 204
  end

  private

  def educator_student_relationship_params
    params.require(:educator_student_relationship)
      .permit(:educator_id, :student_id)
  end

end
