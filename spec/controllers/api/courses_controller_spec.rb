require 'rails_helper'

RSpec.describe Api::CoursesController, type: :controller do

  describe "GET #index" do
    it "returns the correct courses" do
      course_1 = create(:course)
      course_2 = create(:course)

      get :index

      courses_response = json_response
      ids = ids_from_response courses_response
      expect(ids).to match [course_1.id, course_2.id]
      expect(courses_response.length).to be 2
      expect(response.status).to eq 200
    end

    it "courses include course_student_relationships" do
      course = create(:course)
      csr_1 = create(:course_student_relationship, course: course)
      csr_2 = create(:course_student_relationship, course: course)
      csr_3 = create(:course_student_relationship, course: course)
      other_csr = create(:course_student_relationship)

      get :index

      courses_response = json_response
      csr_response = courses_response.first[:course_student_relationships]
      expect(csr_response.length).to eq 3
      ids = ids_from_response csr_response
      expect(ids).to match [csr_1.id, csr_2.id, csr_3.id]
      expect(response.status).to eq 200
    end

    it "courses include educators" do
      educator = create(:educator)
      other_educator = create(:educator)
      course = create(:course, educator: educator)

      get :index

      courses_response = json_response
      educator_response = courses_response.first[:educator]
      expect(educator.id).to equal educator_response[:id]
      expect(response.status).to eq 200
    end
  end

  describe "GET #show" do
    it "shows the correct course" do
      course = create(:course)

      get :show, params: { id: course.id }

      course_response = json_response
      expect(course_response[:name]).to eq course.name
    end
  end

  describe "POST #create" do
    RSpec.shared_examples_for "a failed course creation" do
      it "doesn't create the course" do
        course = attributes_for(:course)

        expect {
          post :create, params: { course: course }
        }.to_not change(Course, :count)
      end

      it "returns a 403 status" do
        post :create, params: { course: attributes_for(:course) }

        expect(response.status).to eq 403
      end
    end

    context "when signed in as an educator" do
      it "creates the course" do
        educator = sign_in_educator
        course = attributes_for(:course, educator: educator)

        expect {
          post :create, params: { course: course }
        }.to change(Course, :count).by(1)
      end
    end

    context "when not signed in" do
      it_behaves_like "a failed course creation"
    end

    context "when signed in as a student" do
      before do
        student = sign_in_student
      end

      it_behaves_like "a failed course creation"
    end
  end

  describe "PATCH #update" do
    context "when updating your own course" do
      context "for a successful update" do
        it "updates then renders the course" do
          educator = sign_in_educator
          course = create(:course, educator: educator)
          name = "New course name"

          patch :update, params: { id: course.id, course: { name: name } }

          course_response = json_response
          expect(course_response[:name]).to eq name
          expect(response.status).to eq 200
        end
      end
    end

    context "when not updating your own course" do
      it "doesn't update the course" do
          educator = create(:educator)
          other_educator = create(:educator)
          course = create(:course, educator: educator)
          name = "New course name"
          sign_in other_educator

          patch :update, params: { id: course.id, course: { name: name } }

          course_response = json_response
          expect(course_response[:name]).to_not eq name
          expect(response.status).to eq 403
      end
    end
  end

  def ids_from_response response
    response.map { |c| c[:id] }
  end
end
