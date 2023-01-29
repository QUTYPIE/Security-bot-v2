const { MessageEmbed } = require(`discord.js`)
module.exports = {
    name : `roleinfo`,
    aliases : ['ri'],
    punitop : false,
    adminPermit : false,
    ownerPermit : false,
    cat : 'util',
    run : async(client,message,args,prefix) => {
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if(!args[0] || !role) return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | Please provide me a valid role.`)]})

        const em = new MessageEmbed().setColor(`#2f3136`).addFields([
            {
                name : `__General Information__`,
                value : `**Role Name** : ${role.name} \n **Role Id** : ${role.id} \n **Role Position** : ${role.rawPosition} / ${message.guild.roles.highest.rawPosition} \n **Role Color** : ${role.hexColor} \n **Role Created** : <t:${Math.round(role.createdTimestamp / 1000)}:R> \n **Hoisted?** : ${role.hoisted ? `${client.emoji.tick}` : `${client.emoji.cross}`} \n **Mentionable?** : ${role.mantionable ? `${client.emoji.tick}` : `${client.emoji.cross}`} \n **Integration** : ${role.manageable ? `True` : `False`}`
            },
            {
                name : `__Allowed Permissions__`,
                value : `${role.permissions.toArray().sort((a,b) => a.localeCompare(b)).map(x => `\`${x}\``).join(', ')}`
            }
        ]).setAuthor({name : `${role.name}'s Information` , iconURL : client.user.displayAvatarURL()}).setThumbnail(message.guild.iconURL({dynamic : true})).setFooter({text : `Requested By : ${message.author.tag}` , iconURL : message.author.displayAvatarURL({dynamic : true})})

        return message.channel.send({embeds : [em]});
    }
}