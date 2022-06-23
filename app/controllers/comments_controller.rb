class CommentsController < ApplicationController
    def index 
        comments = Comment.all
        render json: comments, status: 200
    end

    def show
        comments = Comment.find_by(id: params[:id])
        if comments 
            render json: comments, status: 200
        else 
            render json: {error: "Comment not found"}, status:404
        end
    end

    def update 
        comments = Comment.find_by(id: params[:id])
        if comments 
            comments.update(forumPosts_params_permit)
        render json: comments, status: 201
        else
            render json: {error: "Not successful"}, status: 422
        end
    end
    
    def create 
        newComment = Comment.create(comments_params_permit) 
        if newComment.valid?
            render json: newComment, status:201 
        else
            render json: {"errors":"invalid information"}, status: 422
        end
    end

    def destroy
        comment = Comment.find(params[:id])
        if comment.valid?
        comment.destroy
        end
        
      end

    private

    def comments_params_permit 
        params.permit(:comment, :user_id, :pic_post_id)
    end

end
