def sign_in_educator
  educator = create(:educator)
  sign_in educator
  educator
end

def sign_in_student
  student = create(:student)
  sign_in student
  student
end
