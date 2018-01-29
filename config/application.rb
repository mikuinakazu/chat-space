require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ChatSpace
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    #rails g contollerした時に不要なファイルを作らない
    config.generators do |g|
      g.javascripts false
      g.helper false
      g.test_framework false
      g.assets false
      g.coffee false
    end
  end

end
