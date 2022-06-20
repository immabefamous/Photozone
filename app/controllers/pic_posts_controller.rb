class PicPostsController < ApplicationController
    def index 
        pic_post = PicPost.all
        render json: pic_post, status: 200
    end

    def show
        pic_post = PicPost.find_by(id: params[:id])
        if pic_post 
            render json: pic_post, status: 200
        else 
            render json: {error: "PicPost not found"}, status:404
        end
    end

    def update 
        pic_post = PicPost.find_by(id: params[:id])
        if pic_post 
            pic_post.update(likes: (postPic_params.permit))
        render json: pic_post, status: 201
        else
            render json: {error: "Not successful"}, status: 422
        end
    end
    
    def create 
        newPicPost = PicPost.create(postPic_params.permit) 
        if newPicPost.valid?
            render json: newPicPost, status:201 
        else
            render json: {"errors":"invalid information"}, status: 422
        end
    end

    private

    def postPic_params_permit 
        params.permit(:title, :image, :likes, :dislikes)
    end


end
