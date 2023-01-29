const { MessageEmbed } = require(`discord.js`);
module.exports = {
    name : `unlock`,
    aliases : ["unlockchannel","unlockch"],
    punitop : false,
    adminPermit : true,
    ownerPermit : false,
    cat : 'admin',
    run : async(client,message,args,prefix) => { 
        let ch = message.guild.channels.cache.get(args[0]) || message.channel || message.mentions.channels.first();
        let ro = message.guild.id;
        try{
        ch.permissionOverwrites.edit(message.guild.id,{SEND_MESSAGES : true}).then(x => {
        return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.tick} | SuccessFully **Unlocked** ${ch} for <@&${ro}>`)]}); });
        } catch(e) { return message.channel.send({embeds : [new MessageEmbed().setColor(`${client.emoji.cross} | I am missing adequate permissions.Please check my permissions.`)]})}
    }
}