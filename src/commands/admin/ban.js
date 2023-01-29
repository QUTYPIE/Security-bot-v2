const { MessageEmbed } = require("discord.js")

module.exports = {
    name : `ban`,
    aliases : [`b`],
    ownerPermit : false,
    adminPermit : true,
    punitop : false,
    cat : 'admin',
    run : async(client,message,args,prefix) => {
        if(!args[0])
        {
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | Command Usage : \`${prefix}ban <user> [reason]\``)]})
        }
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | Please prove me a valid user.`)]})

        let reason = args.slice(1).join(' ');
        if(!reason) reason = `No Reason given`;

        if(user.id === message.guild.ownerId) return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | You can't **Ban** Server Owner Dumb`)]})
        if(client.config.owner.includes(user.id)) return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | I can't **Ban** my owner.`)]})

        if(user.id == message.member.id) return message.channel.send({emebds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | You cannot **Ban** Yourself.`)]})
        if(!user.bannable) return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | I can't **ban** that user.Please check my role position and permissions.`)]})
        message.guild.members.ban(user.id,{reason : `${message.author.id} | ${reason}`}).catch((err) => {
            message.channel.send({emebds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | I can't **Ban** that user.Please check my role position and permissions.`)]})
        });
        return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.tick} | SuccessFully **Banned** ${user.user.tag} executed by : ${message.author.tag}\n${client.emoji.arrow} Reason : ${reason}`)]})
    }
}