class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :require_http_auth  if Rails.env.production?

  def require_http_auth
    authenticate_or_request_with_http_basic("Authentication") do |name, password|
      name == 'tone' && password == 'musictshirts1'
    end
  end

end
