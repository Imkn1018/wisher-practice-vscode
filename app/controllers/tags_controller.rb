class TagsController < ApplicationController
  protect_from_forgery :except => [:create]
  def index
  end
  def create
    redirect_to wishes_path
  end
end
