const { MessageEmbed } = require("discord.js");

module.exports = {
    name : `blacklist`,
    aliases : ['bl'],
    punitop : true,
    adminPermit : false,
    ownerPermit : false,
    cat : 'punit',
    run : async(client,message,args,prefix) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!args[0])
        {
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | Command Usage : \`${prefix}blacklist <add/remove/update>\``)]})
        }
        let db = await client.data2.get(`blacklist_${client.user.id}`);
        if(!db || db === null) await client.data2.set(`blacklist_${client.user.id}`,[])

        let bl = [];
        db.forEach(x => bl.push(x));

        let opt = args[0].toLowerCase();
        let reason = args.slice(1).join(' ');
        if(!reason) reason = `No Reason Provided`;

        if(opt === `add`)
        {
            if(!user) return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | Please provde me a valid user.`)]});
            bl.push(user.id);
            await client.data2.set(`blacklist_${client.user.id}`,bl);
            await client.data2.set(`blreason_${user.id}`,reason);
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.tick} | SuccessFully Added ${user} to my **Blacklist**`)]})
        }

        if(opt === `remove`)
        {
            if(!user) return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | Please provide me a valid user.`)]});
            let ok = bl.filter(x => x !== user.id);
            await client.data2.set(`blacklist_${client.user.id}`,ok);
            await client.data2.delete(`blreason_${user.id}`);
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.tick} | SuccessFully Removed ${user} from my **Blacklist**`)]});
        }
        if(opt === `update`)
        {
            let gbans = [];
            bl.forEach(f => gbans.push(`${client.emoji.dot} <@${f}> | [\`${f}\`]`))
            if(gbans.length === 0) { return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | NO users has been Blacklisted from me.`)]})}
            let emb = new MessageEmbed().setColor(`#2f3136`).setDescription(gbans.join(`\n`)).setAuthor({name : `| Blacklisted Users List` , iconURL : client.user.displayAvatarURL()}).setFooter({text : `Total Blacklisted Users : ${gbans.length}`});
            let ch = await client.channels.cache.get(client.config.gban_channel_id);
            if(!ch) {
                return message.channel.send({content : `${client.emoji.cross} | Blacklist Channel not found.`})
            }
            let msg = ch.messages.cache.get(await client.data2.get(`blmsg_${client.user.id}`));
            if(msg) {
            msg.delete().catch(() => {}); }
            ch.send({embeds : [emb]}).then(async(msg) => { await client.data2.set(`blmsg_${client.user.id}`,msg.id) });
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.tick} | Updated Global Bans checkout <#${ch.id}>.`)]})
        }
    }
}