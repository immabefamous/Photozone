class ForumPostsController < ApplicationController
    def index 
        forum_posts = ForumPost.all
        render json: forum_posts, status: 200
    end

    def show
        forum_posts = ForumPost.find_by(id: params[:id])
        if forum_posts 
            render json: forum_posts, status: 200
        else 
            render json: {error: "ForumPost not found"}, status:404
        end
    end

    def update 
        forum_posts = ForumPost.find_by(id: params[:id])
        if forum_posts 
            forum_posts.update(forumPosts_params_permit)
        render json: forum_posts, status: 201
        else
            render json: {error: "Not successful"}, status: 422
        end
    end
    
    def create 
        newForumPost = ForumPost.create(forumPosts_params_permit) 
        if newForumPost.valid?
            render json: newForumPost, status:201 
        else
            render json: {"errors":"invalid information"}, status: 422
        end
    end

    def destroy
        forumPost = ForumPost.find(params[:id])
        if forumPost.valid?
        forumPost.destroy
        end
        
      end
    private

    def forumPosts_params_permit 
        params.permit(:textarea, :image, :user_id, :forum_id)
    end

end
