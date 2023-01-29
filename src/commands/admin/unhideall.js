const { Permissions, MessageEmbed } = require("discord.js")

module.exports = {
    name : `unhideall`,
    aliases : [''],
    punitop : false,
    adminPermit : true,
    cat : 'admin',
    ownerPermit : false,
    run : async(client,message,args,prefix) => {
        if(!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.channel.send({embeds : 
        [
            new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | I don't have adequate permissions.Please check my permissions.`)
        ]});
        let count = 0;
        message.guild.channels.cache.forEach(ch => {
            ch.permissionOverwrites.edit(message.guild.id,{
                VIEW_CHANNEL : true
            }).catch(() => { })
            count++
        });
        return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.tick} | SuccessFully **Unhided** ${count} channels.`)]})
    }
}