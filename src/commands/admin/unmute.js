const { MessageEmbed } = require("discord.js")

module.exports = {
    name : `unmute`,
    aliases : [`um`],
    punitop : false,
    adminPermit : true,
    ownerPermit : false,
    cat : 'admin',
    run : async(client,message,args,prefix) => {
        if(!args[0])
        {
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | Command Usage : \`${prefix}unmute <user> [reason]`)]})
        }

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | Please provide me a valid user.`)]})

        let reason = args.slice(1).join(' ');
        if(!reason) reason = 'No Reason given';

        if(user.id === client.user.id) return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | Hey I know your are dumb why u are proving it!`)]});
        if(user.id === message.guild.ownerId) return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | You can't even mute Server Owner and talking of unmuting him ?`)]})
        
        if(!user.isCommunicationDisabled()) return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | I can't unmute that user.That user is not timed out.`)]})

        if(!user.manageable) return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | I can't unmute that user.Please check my role position and permissions.`)]})
        user.timeout(0,`${message.author.tag} | ${reason}`);
        return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.tick} | SuccessFully **Unmuted** ${user.user.tag} executed by : ${message.author.tag}\n${client.emoji.arrow} Reason : ${reason}`)]});
    }
}