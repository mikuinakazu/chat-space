class MessagesController < ApplicationController

  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
    # @last_message = @messages.last
    # htmlとjsonどっちを読むかはどのように判断？？
    # last_id = 画面に表示されている現状最新のid
      respond_to do |format|
        format.html
        format.json { @differences = @messages.where('id > ?', params[:last_id]) }
        # binding.pry
      end
  end

  def create
    @message = @group.messages.new(message_params)
      if @message.save
        respond_to do |format|
        format.html { redirect_to  group_messages_path(params[:group_id]) }
        format.json
        end
      else
        @messages = @group.messages.includes(:user)
        flash.now[:alert] = 'メッセージを入力してください'
        render :index
      end
  end

  private
    def message_params
      params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
    end

    def set_group
      @group = Group.find(params[:group_id])
    end
end
