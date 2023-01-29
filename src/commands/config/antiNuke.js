const { MessageEmbed , MessageButton , MessageActionRow } = require(`discord.js`);
module.exports = {
    name : "antiNuke",
    aliases : ["antinuke"],
    punitop : false,
    ownerPermit : false,
    adminPermit : false,
    cat : 'security',
    run : async(client,message,args,prefix) => {
        if(!client.config.owner.includes(message.author.id) && message.guild.ownerId !== message.author.id)
        {
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} Only Guild Owner can run this command.`)]})
        }
        let em = new MessageEmbed().setColor(`#2f3136`).setAuthor({name : `${client.user.username.toUpperCase()} ANITNUKE PANEL` , iconURL : client.user.displayAvatarURL()})
        let data = await client.data2.get(`setup_${message.guild.id}`);
        if(!data || data == null) { await client.data2.get(`setup_${message.guild.id}`,`none`) }
        if(data == `beast` || data == `secure`)
        {
            em.setDescription(
                `**${client.emoji.enabled} Anti Ban
                ${client.emoji.enabled} Anti Kick
                ${client.emoji.enabled} Anti Role-Create
                ${client.emoji.enabled} Anti Role-Delete
                ${client.emoji.enabled} Anti Role-Update
                ${client.emoji.enabled} Anti Everyone
                ${client.emoji.enabled} Anti Webhook
                ${client.emoji.enabled} Anti Channel-Create
                ${client.emoji.enabled} Anti Channel-Delete
                ${client.emoji.enabled} Anti Channel-Update
                ${client.emoji.enabled} Anti Bot
                ${client.emoji.enabled} Anti Server-Update
                ${client.emoji.enabled} Anti Webhook
                ${client.emoji.enabled} Anti Prune**`
            )
            if(data == `beast`) { em.setFooter({text : `SECURITY MODE : BEAST MODE` , iconURL : message.guild.iconURL({dynamic : true})}) }
            if(data == `secure`) { em.setFooter({text : `SECURITY MODE : SECURE MODE` , iconURL : message.guild.iconURL({dynamic : true})}) }
        }
        if(data == `none`)
        {
            em.setDescription(
                `**${client.emoji.disabled} Anti Ban
                ${client.emoji.disabled} Anti Kick
                ${client.emoji.disabled} Anti Role-Create
                ${client.emoji.disabled} Anti Role-Delete
                ${client.emoji.disabled} Anti Role-Update
                ${client.emoji.disabled} Anti Everyone
                ${client.emoji.disabled} Anti Webhook
                ${client.emoji.disabled} Anti Channel-Create
                ${client.emoji.disabled} Anti Channel-Delete
                ${client.emoji.disabled} Anti Channel-Update
                ${client.emoji.disabled} Anti Bot
                ${client.emoji.disabled} Anti Server-Update
                ${client.emoji.disabled} Anti Webhook
                ${client.emoji.disabled} Anti Prune**`
            ).setFooter({text : `SECURITY MODE : NONE` , iconURL : message.guild.iconURL({dynamic : true})})
        };

        let r1 = new MessageActionRow().addComponents(new MessageButton().setStyle("DANGER").setLabel(`SETUP`).setCustomId(`ini_setup`));
        return message.channel.send({embeds : [em] , components : [r1]});
    }
}