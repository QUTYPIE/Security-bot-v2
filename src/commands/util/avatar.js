const { MessageEmbed } = require(`discord.js`);
module.exports = {
    name : `avatar`,
    aliases : ['av','pfp'],
    punitop : false,
    adminPermit : false,
    ownerPermit : false,
    cat : 'util',
    run : async(client,message,args,prefix) => {
        let user;
        if(!user || user === null) user = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.author;
        if(!user || user === null) return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | I couldn't find the provided member.`)]})

        let emb = new MessageEmbed().setColor(`#2f3136`).setImage(user.displayAvatarURL({dynamic : true ,size : 512})).addFields([
            {
                name : `__Download Links__`,
                value : `[PNG](${user.displayAvatarURL({dynamic : true , format : 'png'})}) | [JPG](${user.displayAvatarURL({dynamic : true , format : 'jpg'})}) | [GIF](${user.displayAvatarURL({dynamic : true , format : 'gif'})})`
            }
        ]).setFooter({text : `Requested By : ${message.author.tag}` , iconURL : message.author.displayAvatarURL({dynamic : true})});
        return message.channel.send({embeds : [emb]});
    }
}