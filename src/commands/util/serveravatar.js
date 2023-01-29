const { MessageEmbed } = require("discord.js")

module.exports = {
    name : `serveravatar`,
    aliases :['serverav','servericon','sav'],
    punitop : false,
    adminPermit : false,
    ownerPermit : false,
    cat : 'util',
    run : async(client,message,args,prefix) => {
        let em = new MessageEmbed().setColor(`#2f3136`).setImage(message.guild.iconURL({dynamic : true , size : 512 })).setFooter({text : `Requested By : ${message.author.tag}` , iconURL : message.author.displayAvatarURL({dynamic : true})}).setAuthor({name : `${message.guild.name}'s Server Icon`})
        return message.channel.send({embeds : [em]});
    }
}