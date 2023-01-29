const { Permissions, MessageEmbed } = require("discord.js")

module.exports = {
    name : `voiceKick`,
    aliases : ['vckick','voicekick'],
    punitop : false,
    adminPermit : false,
    cat : 'util',
    ownerPermit : false,
    run : async(client,message,args,prefix) => {
        if(!message.member.permissions.has(Permissions.FLAGS.MOVE_MEMBERS)){
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | You require \`Move Members\` permissions to run this command.`)]})
        }
        if(!args[0]){
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | Command Usage : \`${prefix}voicekick <user>\``)]})
        }
        let user = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.guild.members.fetch(args[0]);
        if(!user){
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | Please provide me a valid user.`)]})
        }
        if(!user.voice.channel){
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | The provided user is not connected to any voice channel.`)]})
        }
        if(message.guild.me.permissions.has(Permissions.FLAGS.MOVE_MEMBERS)){
            user.voice.disconnect();
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.tick} | SuccessFully **Voice Kicked** *${user.user.tag}* from ${user.voice.channel} \n ${client.emoji.arrow} Action By : ${message.author.tag}`)]})
        }
        else{
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription9`${client.emoji.cross} | I don't have adequate permissions.Please check my permissions.`]})
        }
    }
}