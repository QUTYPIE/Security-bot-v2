const { MessageEmbed, MessageActionRow, MessageButton } = require(`discord.js`);
module.exports = {
    name : `invite`,
    aliases : ['inv'],
    punitop : false,
    adminPermit : false,
    ownerPermit : false,
    cat : 'info',
    run : async(client,message,args,prefix) => {
        let em = new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.info} | Click on the button below to [invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands) me`);
        let b1 = new MessageActionRow().addComponents(
            new MessageButton().setStyle(`LINK`).setLabel(`Invite`).setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
        );
        return message.channel.send({embeds : [em] , components : [b1]});
    }
}