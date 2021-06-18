class WishTagRelationshipsController < ApplicationController
  protect_from_forgery :except => [:create]
  def create
    redirect_to wishes_path
  end
end