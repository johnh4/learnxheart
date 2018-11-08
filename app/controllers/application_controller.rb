class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception, if: Proc.new {|c| c.request.format.html? }
  protect_from_forgery with: :null_session, if: Proc.new {|c| c.request.format.json? }
  include Authenticatable

  rescue_from CanCan::AccessDenied do |exception|
    respond_to do |format|
      format.json { render json: { message: exception.message }, status: :forbidden }
      format.html { redirect_to root_url, alert: exception.message }
    end
  end
end
