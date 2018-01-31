class UsersController < ApplicationController

  def edit
  end

  def update
    # updateに成功した場合はルートパスにリダイレクト、失敗した場合はレビューを再度表示。
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end

end
