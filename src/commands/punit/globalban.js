const { MessageEmbed } = require("discord.js");

module.exports = {
    name : `globalban`,
    aliases : ['gban'],
    punitop : true,
    cat : 'punit',
    adminPermit : false,
    ownerPermit : false,
    run : async(client,message,args,prefix) => {
        let user = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
        if(!args[0])
        {
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | Command Usage : \`${prefix}globalban <add/remove/update>\``)]})
        }

        let db = await client.data2.get(`gban_${client.user.id}`);
        if(!db || db === null) { client.data2.set(`gban_${client.user.id}`,[]) }
        
        let gb = []
        db.forEach(x => gb.push(x));

        
        let opt = args[0].toLowerCase();
        let reason = args.slice(1).join(' ');
        if(!reason) reason = `No Reason provided`;
        if(opt === `add`)
        {
            if(!user) return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | Please provide me a valid user.`)]})
            gb.push(user.id);
            await client.data2.set(`gban_${client.user.id}`,gb);
            await client.data2.set(`gbanreason_${user.id}`,reason);
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.tick} | SuccessFully Added ${user} to my **Globan Ban**. ]`)]})
        }
        if(opt === `remove`)
        {
            if(!user) return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | Please provide me a valid user.`)]})
            let dog = gb.filter(x => x !== user.id)
            await client.data2.set(`gban_${client.user.id}`,dog);
            await client.data2.delete(`gbanreason_${user.id}`);
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | SuccessFully Removed ${user} from my **Global Ban**.`)]})
        }
        if(opt === `update`)
        {
            let gbans = [];
            gb.forEach(f => gbans.push(`${client.emoji.dot} <@${f}> | [\`${f}\`]`))
            if(gbans.length === 0) { return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | NO users has been Globally Banned from me.`)]})}
            let emb = new MessageEmbed().setColor(`#2f3136`).setDescription(gbans.join(`\n`)).setAuthor({name : `| Global bans List` , iconURL : client.user.displayAvatarURL()}).setFooter({text : `Total Global bans : ${gbans.length}`});
            let ch = await client.channels.cache.get(client.config.gban_channel_id);
            if(!ch) {
                return message.channel.send({content : `${client.emoji.cross} | Global Bans Channel not found.`})
            }
            let msg = ch.messages.cache.get(await client.data2.get(`gbanmsg_${client.user.id}`));
            if(msg) {
            msg.delete().catch(() => {}); }
            ch.send({embeds : [emb]}).then(async(msg) => { await client.data2.set(`gbanmsg_${client.user.id}`,msg.id) });
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.tick} | Updated Global Bans checkout <#${ch.id}>.`)]})
        }
    }
}