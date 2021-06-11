class WishesController < ApplicationController
  before_action :authenticate_user!
  def new
    @wish = current_user.wishes.new
  end
  def index
       user = User.find_by(id: current_user.id)
       @wishes = user.wishes
       @wish = current_user.wishes.new
       @tag_list = Tag.all

  end
  def create
    @wish = current_user.wishes.new(wish_params)
    tag_list = params[:wish][:tag_name].split(nil)
    if @wish.save
      @wish.save_tag(tag_list)
      redirect_to wishes_path
    else
      redirect_back(fallback_location: root_path)
    end
  end

      def show
        @wish = Wish.find_by(params[:id])
        @wish_tags = @wish.tags
      end

      def edit
        @wish = Wish.find_by(params[:id])
      end

    def update
      @wish = Wish.find_by(params[:id])
      tag_list = params[:wish][:tag_name].split(nil)
      if @wish.save
        @wish.save_tag(tag_list)
        redirect_back(fallback_location: root_path)
      else
        redirect_back(fallback_location: root_path)
      end
    end

    def complete
      @wish = Wish.find_by(params[:id])
      @wish.update(isCompleted: true)
    end
     def dones
        user = User.find_by(id: current_user.id)
        @wishes = user.Wish.where(:isCompleted => true)..order("due_date")
     end
      private

      def wish_params
        params.require(:wish).permit(:wish_title,:memo,:wish_image_id,:span,:difficulty,:url)
      end
end
