const { Permissions, MessageEmbed } = require("discord.js")

module.exports = {
    name : `lockall`,
    aliases : ['lockserver','lockdown'],
    punitop : false,
    adminPermit : true,
    cat : 'admin',
    ownerPermit : false,
    run : async(client,message,args,prefix) => {
        if(!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.channel.send({embeds : [
            new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | I don't have adequate permissions.Please check my permissions`)
        ]});
        let count = 0;
        message.guild.channels.cache.forEach(c => {
            c.permissionOverwrites.edit(message.guild.id,{
                SEND_MESSAGES : false
            }).catch(() => { });
            count++;
        });
        return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.tick} | SuccessFully **Locked** ${count} channels.`)]})
    }
}