const { MessageEmbed } = require(`discord.js`);
module.exports = {
    name : `userinfo`,
    aliases : ["ui"],
    punitop : false,
    adminPermit : false,
    ownerPermit : false,
    cat : 'util',
    run : async(client,message,args,prefix) => {
        let user;
        if(!args[0]) user = message.author;
        else{user = message.mentions.users.first() || client.users.cache.get(args[0])}
        let me = message.guild.members.cache.get(user.id);
        
        if(me)
        {
            let flags = '';
            let userFlags = me.user.flags.toArray();
            if(userFlags.includes('DISCORD_EMPLOYEE')) flags += ` ${client.emoji.discord_employee}`;
            if(userFlags.includes('DISCORD_PARTNER')) flags += ` ${client.emoji.discord_partner}`;
            if(userFlags.includes('BUGHUNTER_LEVEL_1')) flags += ` ${client.emoji.bug_hunter_level1}`;
            if(userFlags.includes('BUGHUNTER_LEVEL_2')) flags += ` ${client.emoji.bug_hunter_level2}`;
            if(userFlags.includes('HYPESQUAD_EVENTS')) flags += ` ${client.emoji.hypesquad_events}`;
            if(userFlags.includes('HOUSE_BRAVERY')) flags += ` ${client.emoji.house_bravery}`;
            if(userFlags.includes('HOUSE_BRILLIANCE')) flags += ` ${client.emoji.house_brilliance}`;
            if(userFlags.includes('HOUSE_BALANCE')) flags += ` ${client.emoji.house_balance}`;
            if(userFlags.includes('EARLY_SUPPORTER')) flags += ` ${client.emoji.early_supporter}`;
            if(userFlags.includes('TEAM_USER')) flags += ` ${client.emoji.team_user}`;
            if(userFlags.includes('SYSTEM')) flags += ` ${client.emoji.system}`;
            if(userFlags.includes('VERIFIED_BOT')) flags += ` ${client.emoji.verfied_bot}`;
            if(userFlags.includes('VERIFIED_DEVELOPER')) flags += ` ${client.emoji.verified_developer}`;
            if(userFlags.includes('ACTIVE_DEVELOPER')) flags += ` ${client.emoji.active_developer}`;
            if(flags === '') flags = `${client.emoji.cross} Null User Badges`;

            let keys = '';
            let f = me.permissions.toArray();
            if(f.includes('ADMINISTRATOR')) keys = `Server Administrator`;
            if(f.includes(['MODERATE_MEMBERS','KICK_MEMBERS','BAN_MEMBERS'])) keys = 'Server Moderator';
            if(me.user.id === message.guild.ownerId) keys = 'Server Owner';
            else keys = 'Server Member';
            
            let emb = new MessageEmbed().setColor(`#2f3136`).setAuthor({name : `${me.user.tag}'s Information` , iconURL : me.user.displayAvatarURL({dynamic : true})}).setThumbnail(me.user.displayAvatarURL({dynamic : true})).addFields([
                {
                    name : `__General Information__`,
                    value : `**UserName** : ${me.user.username} \n **User Id** : ${me.user.id} \n **Nickname** : ${me.nickname ? me.nickname : 'None'} \n **Bot?** : ${me.user.bot ? `${client.emoji.tick}` : `${client.emoji.cross}`} \n **Discord Badges** : ${flags} \n **Account Created** : <t:${Math.round(me.user.createdTimestamp / 1000)}:R> \n **Server Joined** : <t:${Math.round(me.joinedTimestamp / 1000)}:R>`
                },
                {
                    name : `__Roles Info__`,
                    value : `**Highest Role** : ${me.roles.highest} \n **Color** : ${me.displaHexColor} \n **Roles [${me.roles.cache.size}]** : ${me.roles.cache.size < 30 ? [...me.roles.cache.values()].sort((a,b) => b.rawPosition - a.rawPosition).map(r => `<@&${r.id}>`).join(', ') : me.roles.cache.size > 30 ? trimArray(me.roles.cache) : 'NO ROLES'}`
                },
                {
                    name : `__Key Permissions__`,
                    value : `${me.permissions.toArray().sort((a,b) => a.localeCompare(b)).map(x => `\`${x}\``).join(', ')}`
                },
                {
                    name : `__Acknowledgement__`,
                    value : `${keys}`
                }
            ]).setFooter({text : `Requested By : ${message.author.tag}` , iconURL : message.author.displayAvatarURL({dynamic : true})});
            return message.channel.send({embeds : [emb]});
        }
        if(!me)
        {
            let flags = '';
            let userFlags = user.flags.toArray();
            if(userFlags.includes('DISCORD_EMPLOYEE')) flags += ` ${client.emoji.discord_employee}`;
            if(userFlags.includes('DISCORD_PARTNER')) flags += ` ${client.emoji.discord_partner}`;
            if(userFlags.includes('BUGHUNTER_LEVEL_1')) flags += ` ${client.emoji.bug_hunter_level1}`;
            if(userFlags.includes('BUGHUNTER_LEVEL_2')) flags += ` ${client.emoji.bug_hunter_level2}`;
            if(userFlags.includes('HYPESQUAD_EVENTS')) flags += ` ${client.emoji.hypesquad_events}`;
            if(userFlags.includes('HOUSE_BRAVERY')) flags += ` ${client.emoji.house_bravery}`;
            if(userFlags.includes('HOUSE_BRILLIANCE')) flags += ` ${client.emoji.house_brilliance}`;
            if(userFlags.includes('HOUSE_BALANCE')) flags += ` ${client.emoji.house_balance}`;
            if(userFlags.includes('EARLY_SUPPORTER')) flags += ` ${client.emoji.early_supporter}`;
            if(userFlags.includes('TEAM_USER')) flags += ` ${client.emoji.team_user}`;
            if(userFlags.includes('SYSTEM')) flags += ` ${client.emoji.system}`;
            if(userFlags.includes('VERIFIED_BOT')) flags += ` ${client.emoji.verfied_bot}`;
            if(userFlags.includes('VERIFIED_DEVELOPER')) flags += ` ${client.emoji.verified_developer}`;
            if(userFlags.includes('ACTIVE_DEVELOPER')) flags += ` ${client.emoji.active_developer}`;
            if(flags === '') flags = `${client.emoji.cross} Null User Flags`;

            let em = new MessageEmbed().setColor(`#2f3136`).setAuthor({name : `${user.username}'s Information` , iconURL : user.displayAvatarURL({dynamic : true})}).addFields([
                {
                    name : `__General Information__`,
                    value : `**UserName** : ${user.username} \n **User ID** : ${user.id} \n **Bot?** : ${user.bot ? `${client.emoji.tick}` : `${client.emoji.cross}`} \n **Discord Badges** : ${flags} \n **Account Created** : <t:${Math.round(user.createdTimestamp / 1000)}:R>`
                }
            ]).setFooter({text : `Requested By : ${message.author.tag} | This User is not from this guild` , iconURL : message.author.displayAvatarURL({dynamic : true})}).setThumbnail(user.displayAvatarURL({dynamic : true}));

            return message.channel.send({embeds : [em]});
        }
        else{
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | I was unable to find the user.`)]})
        }
    }
}

function trimArray(arr, maxLen = 25) {
    if ([...arr.values()].length > maxLen) {
      const len = [...arr.values()].length - maxLen;
      arr = [...arr.values()].sort((a, b) => b?.rawPosition - a.rawPosition).slice(0, maxLen);
      arr.map(role => `<@&${role.id}>`)
      arr.push(`${len} more...`);
    }
    return arr.join(", ");
}