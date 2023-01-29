const { MessageEmbed } = require("discord.js")

module.exports = {
    name : `membercount`,
    aliases : ['mc'],
    punitop : false,
    adminPermit : false,
    ownerPermit : false,
    cat : 'util',
    run : async(client,message,args,prefix) => {
        let emb = new MessageEmbed().setColor(`#2f3136`).setDescription(
            `${client.emoji.info} __**TOTAL MEMBERS**__ : \`${message.guild.memberCount}\` Members`
        ).setFooter({text : `Requested By : ${message.author.tag}` , iconURL : message.author.displayAvatarURL({dynamic : true})})
        return message.channel.send({embeds : [emb]});
    }
}