require 'httparty'
require 'json'

module Bot::DiscordCommands
  module Dog
    extend Discordrb::Commands::CommandContainer
    command([:dog, :doggo],
            description: '',
            usage: '') do |event|
      response = HTTParty.get('https://random.dog/woof.json')

      event.channel.send_embed do |embed|
        embed.title = ['🐶', '🐕', '🐩'].sample
        embed.url = JSON.parse(response.body)['url']

        embed.image = Discordrb::Webhooks::EmbedImage.new(url: JSON.parse(response.body)['url'])

        embed.color = Bot::CONFIG.color
        embed.timestamp = Time.now
        embed.footer = Discordrb::Webhooks::EmbedFooter.new(text: "Requested by #{event.message.author.username}", icon_url: event.message.author.avatar_url)
      end
    end
  end
end
