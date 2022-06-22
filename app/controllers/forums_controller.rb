class ForumsController < ApplicationController

    def index 
        forums = Forum.all
        render json: forums, status: 200
    end

    def show
        forums = Forum.find(params[:id])
        if forums 
            render json: forums, status: 200
        else 
            render json: {error: "Forum not found"}, status:404
        end
    end

    def update 
        forums = Forum.find_by(title: params[:title])
        if forums 
            forums.update(forum_params_permit)
        render json: forums, status: 201
        else
            render json: {error: "Not successful"}, status: 422
        end
    end
    
    def create 
        newForum = Forum.create(forum_params_permit) 
        if newForum.valid?
            render json: newForum, status:201 
        else
            render json: {"errors":"invalid information"}, status: 422
        end
    end

    private

    def forum_params_permit 
        params.permit(:title, :image, :user_id)
    end

end
