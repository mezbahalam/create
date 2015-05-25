class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :authenticate_with_http_basic_authentication if Rails.env.production?

  private

 	def authenticate_with_http_basic_authentication
    authenticate_or_request_with_http_basic("Authentication") do |name, password|
      name == 'tone' && password == 'musictshirts1'
    end
  end
end
