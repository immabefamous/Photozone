class SessionsController < ApplicationController
    # skip_before_action :authorize, only: :create

  def create
    user = User.find_by(username: params[:username])
    if user
      session[:user_id] = user.id
      render json: user
    else
      render json: { errors: ["Invalid username or password"] }, status: :unauthorized
    end
  end

  def update
    user = User.find_by(id: params[:id])
    if user
      user.update(subscription: (params[:subscription]))
      render json: user
    else
      render json: { errors: ["unable to update"] }, status: :unauthorized
    end
  end

  def destroy
    session.delete :user_id
    head :no_content
  end
  
end
