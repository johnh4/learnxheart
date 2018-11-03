module Authenticatable
  def current_user
    return @current_user unless @current_user.nil?
    @current_user ||= User.find_by(token: token)
  end

  def current_educator
    current_user if current_user.educator?
  end

  def current_student
    current_user if current_user.student?
  end

  def user_signed_in?
    current_user.present?
  end

  def educator_signed_in?
    current_user.present? ? current_user.educator? : false
  end

  def student_signed_in?
    current_user.present? ? current_user.student? : false
  end

  private

  def token
    return @token unless @token.nil?
    @token ||= request.headers['Authorization']
  end
end