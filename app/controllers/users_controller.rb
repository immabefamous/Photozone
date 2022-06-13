class UsersController < ApplicationController
    def index 
        users = User.all
        render json: users, status: 200
    end

    def show
        user = User.find_by(username: params[:username])
        if user 
            render json: user, status: 200
        else 
            render json: {error: "User not found"}, status:404
        end
    end

    def update 
        user = User.find_by(username:params[:username])
        if user 
            user.update(user_params_permit)
        render json: user, status: 201
        else
            render json: {error: "Not successful"}, status: 422
        end
    end
    
    def create 
        newUser = User.create(params.permit) 
        if newUser.valid?
            render json: newUser, status:201 
        else
            render json: {"errors":"invalid information"}, status: 422
        end
    end


    private 

    def user_params_permit 
        params.permit(:name, :username, :password, :image)
    end
end
