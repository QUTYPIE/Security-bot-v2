const { MessageEmbed } = require("discord.js")

module.exports = {
    name : `unbanall`,
    aliases : ['uball','unball','unball'],
    punitop : false,
    cat : 'admin',
    ownerPermit : false,
    adminPermit : true,
    run : async(client,message,args,prefix) => {
        if(message.guild.me.permissions.has("BAN_MEMBERS")){
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | I don't have adequate permissions.Please check my permissions.`)]})
        }
        let msg = await message.channel.send({embeds : [new MessageEmbed().setColor(`${client.emoji.info} | Removing bans from the users....`)]})
        message.guild.bans.fetch().then(x => {
            if(x.size === 0){
                return msg.edit({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | No Users has been banned in this guild.`)]})
            }
            else{
                let count = 0;
                x.forEach(b => {
                    message.guild.members.unban(b.user.id,{reason : `${message.author.tag} | ${client.user.username.toUpperCase()} | UNBAN ALL COMMAND`});
                    count++;
                });
                return msg.edit({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.tick} | SuccessFully **Unbanned** ${count} Users from the guild.`)]})
            }
        })
    }
}