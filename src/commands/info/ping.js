const { MessageEmbed } = require("discord.js")

module.exports = {
    name : "ping",
    aliases : ["latency"],
    cat : "Info",
    run : async(client,message,args,prefix) => {
        message.channel.send(`${client.emoji.uptime} | My Web Socket Latency is - \`${client.ws.ping}ms\``)
    }
}