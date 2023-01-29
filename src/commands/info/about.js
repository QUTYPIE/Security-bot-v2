const { MessageEmbed } = require("discord.js")

module.exports = {
    name : `about`,
    aliases : ['abo'],
    punitop : false,
    adminPermit : false,
    ownerPermit : false,
    cat : 'info',
    run : async(client,message,args,prefix) => {
        let em = new MessageEmbed().setColor(`#2f3136`).setDescription(
            `__**What do I do?**__
            ${client.emoji.dot} I am a powerful securty application to secure your servers
            ${client.emoji.dot} I am fulfilled with powerful modules to secure your servers from getting nuked or wizzed
            ${client.emoji.dot} I come up with advanced security factors
            ${client.emoji.arrow} You may use me by trying - \`${prefix}help\`
            ${client.emoji.arrow} My useful commands - \`${prefix}setup\` and \`${prefix}antinuke\` 
            `
        ).setAuthor({name : `| Hey There I am ${client.user.username}` , iconURL : client.user.displayAvatarURL()}).setThumbnail(client.user.displayAvatarURL({dynamic : true}))
        .addFields([
	    {name : `${client.emoji.owner} Owners`,value : `[VijayyOp....!!!#0094](${client.config.support_server_link}) \n [~ Punit_xD 🥀#5834](https://instagram.com/_.punnii._)` , inline : true},
            {name : `${client.emoji.verified_bot_developer} Developer`,value : `[~ Punit_xD 🥀#5834](https://instagram.com/_.punnii._)` , inline : true},
            {
                name : `Importants`,
                value : `[Support](${client.config.support_server_link}) \n [Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)`,
                inline : true
            }
        ]);

        return message.channel.send({embeds : [em]});
    }
}