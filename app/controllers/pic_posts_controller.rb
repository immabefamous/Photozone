class PicPostsController < ApplicationController
    def index 
        pic_post = PicPost.all
        render json: pic_post, status: 200
    end

    def show
        pic_post = PicPost.find_by(username: params[:username])
        if pic_post 
            render json: pic_post, status: 200
        else 
            render json: {error: "PicPost not found"}, status:404
        end
    end

    def update 
        pic_post = PicPost.find_by(title: params[:title])
        if pic_post 
            pic_post.update(picPost_params_permit)
        render json: pic_post, status: 201
        else
            render json: {error: "Not successful"}, status: 422
        end
    end
    
    def create 
        newPicPost = PicPost.create(params.permit) 
        if newPicPost.valid?
            render json: newPicPost, status:201 
        else
            render json: {"errors":"invalid information"}, status: 422
        end
    end

    private

    def postPic_params_permit 
        params.permit(:title, :image)
    end


end
