const { MessageEmbed, Permissions } = require("discord.js");

module.exports = async(client) => {
    client.on('messageCreate',async message => {
        if(!message.guild) return;
        const urls = ['discord.gg/','dsc.gg/'];
        for(const link of urls){
            if(message.content.includes(link))
            {
                if(message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;
                if(message.author.id === message.guild.ownerId) return;
                let wl = await client.data3.get(`antiLinks_${message.guild.id}`);
                if(!wl || wl == null) { await client.data3.set(`antiLinks_${message.guild.id}`,[]) }
                if(wl.includes(message.author.id)) return;
                if(client.config.owner.includes(message.author.id)) return;

                else{
                    await message.delete().catch(() => { });
                    if(!message.member.manageable) return;
                    message.member.timeout(10 * 60 * 1000,`${client.user.username.toUpperCase()} SECURITY | INVITE LINKS`);
                    return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.arrow} *I have timed out ${message.author.tag} for* \n Reason : Sending Invite Links.`)]}).then(() => message.member.send(
                        {embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.arrow} *You have been timed out in ${message.guild.name} for* \n Reason : Sending Invite Links `)]}
                    ).catch(() => { }))
                }
            }
        }
    });
}