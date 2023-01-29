const { MessageEmbed, Permissions } = require("discord.js")
const ms = require(`ms`);
module.exports = {
    name : `mute`,
    aliases : ["timeout",'stfu','m'],
    adminPermit : true,
    ownerPermit : false,
    cat : 'admin',
    punitop : false,
    run : async(client,message,args,prefix) => {
        if(!args[0])
        {
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | Command Usage : \`${prefix}mute <user> <time> [reason]\``)]})
        }

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | Please provide me a valid user.`)]})

        let reason = args.slice(2).join(' ');
        if(!reason) reason = `No Reason given`;

        let time = args[1];
        if(!time) time = '7days';

        let dur = ms(time);

        if(!dur){
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | Please provide me a valid time.`)]})
        }
        if(user.isCommunicationDisabled()) return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | I can't mute that user.That user is already muted.`)]})
        if(user.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | I can't mute admins.`)]})

        if(user.id === client.user.id) return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | Hey I know your are dumb why u are proving it!`)]});
        if(user.id === message.guild.ownerId) return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | You can't mute Server Owner Dumb.`)]})
        if(client.config.owner.includes(user.id)) return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | I can't mute my owner.`)]})
        if(user.id === message.member.id) return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | You cannot **Mute** Yourself.`)]})
        if(!user.manageable) return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | I can't mute that user.Please check my role position and permissions.`)]})
        user.timeout(dur,`${message.author.tag} | ${reason}`);
        return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.tick} | SuccessFully **Muted** ${user.user.tag} executed by : ${message.author.tag}\n${client.emoji.arrow} Reason : ${reason}`)]});
    }
}