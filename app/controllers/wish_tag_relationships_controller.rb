class WishTagRelationshipsController < ApplicationController
  protect_from_forgery :except => [:create,:destroy]
  def create
    redirect_to wishes_path
  end
  def destroy
    head :no_content
  end
end