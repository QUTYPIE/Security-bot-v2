const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
    name : `support`,
    aliases : [''],
    punitop : false,
    cat : 'info',
    adminPermit : false,
    ownerPermit : false,
    run : async(client,message,args,prefix) => {
        let emb = new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.info} | Click [here](${client.config.support_server_link}) to join support server.`);
        let but = new MessageActionRow().addComponents(new MessageButton().setStyle('LINK').setLabel(`Support`).setURL(client.config.support_server_link));
        return message.channel.send({embeds : [emb] , components : [but]});
    }
}