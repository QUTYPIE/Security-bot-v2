const { MessageEmbed, Permissions } = require("discord.js")

module.exports = {
    name : `voiceMove`,
    aliases : ['voicemove','vcmove','vcm'],
    punitop : false,
    adminPermit : false,
    ownerPermit : false,
    run : async(client,prefix,args,message) => {
        if(!message.member.permissions.has(Permissions.FLAGS.MOVE_MEMBERS)){
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | You require \`Move Members\` permissions to run this command.`)]})
        }
        if(!args[0])
        {
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(
                `\`voicemove <all>\`
                ${client.emoji.arrow} Moves all the members to the mentioned voice channel
                
                \`voicemove <user>\`
                ${client.emoji.arrow} Moves the mentioned user to the voice channel`
            )]})
        }
    }
}