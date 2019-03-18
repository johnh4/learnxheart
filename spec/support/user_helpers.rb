def sign_in_educator(educator = nil)
  educator ||= create(:educator)
  request.headers["Authorization"] = educator.token
  educator
end

def sign_in_student(student = nil)
  student ||= create(:student)
  request.headers["Authorization"] = student.token
  student
end

def sign_in_user(user = nil)
  user ||= create(:user)
  request.headers["Authorization"] = user.token
  user
end