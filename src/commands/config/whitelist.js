const { MessageEmbed , MessageActionRow , MessageSelectMenu , MessageButton } = require(`discord.js`);
module.exports = {
    name : `whitelist`,
    aliases : ["wl"],
    ownerPermit : true,
    adminPermit : false,
    cat : "security",
    run : async(client,message,args,prefix) => {
        if(!args[0])
        {
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | Usage : \`${prefix}whitelist <add/remove/show>\``)]})
        }

        let db = await client.data3.get(`whitelist_${message.guild.id}`);
        let wl = [];
        let an = [];
        if(db == null || !db) { await client.data3.set(`whitelist_${message.guild.id}`,an) }
        else { db.forEach(x => wl.push(`${client.emoji.arrow} <@${x}> | [\`${x}\`]`)); db.forEach(x => an.push(x)); }

        let db2 = await client.data3.get(`wlEv_${message.guild.id}`);
        if(!db2 || db2 === null) { await client.data3.set(`wlEv_${message.guild.id}`,[]) }
        let lol = [];
        let l2 = [];
        db2.forEach(x => lol.push(x));
        db2.forEach(x => l2.push(`${client.emoji.arrow} <@${x}> | [\`${x}\`]`));

        let db3 = await client.data3.get(`antiLinks_${message.guild.id}`);
        if(!db3 || db3 === null) { await client.data3.set(`antiLinks_${message.guild.id}`,[]) }
        let ok1 = [];
        let ok2 = [];
        db3.forEach(x => ok1.push(x));
        db3.forEach(x => ok2.push(`${client.emoji.arrow} <@${x}> | [\`${x}\`]`));

        let opt = args[0].toLowerCase();
        if(opt === `show`)
        {
            let emb = new MessageEmbed().setColor(`#2f3136`).setDescription(`Choose The Cateogry Below to show the whitelisted Users`);
            let ro = new MessageActionRow().addComponents(new MessageSelectMenu().setCustomId(`help`).setPlaceholder(`> Whitelist Options`).addOptions([
                {label : `AntiNuke Whitelist` , emoji : `${client.emoji.antinuke}` , description : `Shows Antinuke Whitelist` , value : `wl1`},
                {label : `Everyone Whitelist` , emoji : `${client.emoji.everyone}` , description : `Shows  Anti-Everyone Whitelist` , value : `wl2`},
                {label : `AntiInvite Whitelist` , emoji : `${client.emoji.invites}` , description : `Shows AntiInvite Whitelist` , value : `wl3`},
            ]));
            
            let msg = await message.channel.send({embeds : [emb],components : [ro]});
            let collector = await msg.createMessageComponentCollector({
                filter : (b) => {
                    if(b.user.id == message.author.id) return true;
                    else{
                        return i.reply({content : `${client.emoji.cross} | You are not authorized to take this action.`})
                    }
                },
                time : 100000,
                idle : 100000/2
            });

            collector.on('collect',async(b) => {
                if(b.isSelectMenu())
                {
                    for(const value of b.values){
                        if(value === `wl1`)
                        {
                            if(!msg) return;
                            let em = new MessageEmbed().setColor(`#2f3136`)
                            if(wl.length === 0) { em.addFields([{name : `${client.emoji.antinuke} AntiNuke Whitelist Users : \`${wl.length}\`` , value : `No Members has been whitelisted in this category`}])}
                            else { em.setDescription(`${client.emoji.antinuke} __**AntiNuke Whitelist Users**__ : \`${wl.length}\``+"\n"+`${wl.join(`\n`)}`) }
                            return b.update({embeds : [em]});
                        }
                        if(value === `wl2`)
                        {
                            if(!msg) return;
                            let e = new MessageEmbed().setColor(`#2f3136`)
                            if(l2.length === 0) { e.addFields([{name : `${client.emoji.everyone} Everyone Whitelist Users : \`${l2.length}\`` , value : `No Members has been whitelisted in this category`}])}
                            else { e.setDescription(`${client.emoji.everyone} __**Everyone Whitelist Users**__ : \`${ok2.length}\``+"\n"+`${l2.join(`\n`)}`) }
                            return b.update({embeds : [e]});
                        }
                        if(value === `wl3`)
                        {
                            if(!msg) return;
                            let o = new MessageEmbed().setColor(`#2f3136`)
                            if(ok2.length === 0) { o.addFields([{name : `${client.emoji.invites} Anti-Invite Whitelist Users : \`${ok2.length}\`` , value : `No Members has been whitelisted in this category`}])}
                            else { o.setDescription(`${client.emoji.invites} __**Anti-Invite Whitelist Users**__ : \`${ok2.length}\``+"\n"+`${ok2.join(`\n`)}`) }
                            return b.update({embeds : [o]});
                        }
                    }
                }
            });
            collector.on('end',async(b) => {
                if(!msg) return;
                await msg.edit({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`**TIMED OUT! RUN WHITELIST COMMAND AGAIN.**`)],components : []})
            });
        }
        if(opt === `add`)
        {
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
            if(!user) {
                return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | Please provide me a valid user.`)]})
            }
            let em = new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.arrow} Choose the Categories Below`).setTitle(`${client.user.username.toUpperCase()} WHITELISTING PANEL`)
            let ro = new MessageActionRow().addComponents(
                new MessageSelectMenu().setCustomId(`help`).setPlaceholder(`> ${client.user.username} Whitelisting Categories`).addOptions([
                    {
                        label : `AntiNuke`,
                        value : `p1`,
                        emoji : `${client.emoji.antinuke}`,
                        description : `Whitelists a user from all kind of Antinuke`
                    },
                    {
                        label : `Everyone`,
                        value : `p2`,
                        emoji : `${client.emoji.everyone}`,
                        description : `Whitelists a user from anti-everyone`
                    },
                    {
                        label : `Invite`,
                        value : `p3`,
                        emoji : `${client.emoji.invites}`,
                        description : `Whitelists a user from anti-invite`
                    }
                ])
            );

            const msg = await message.channel.send({embeds : [em] , components : [ro]});


            const collector = await msg.createMessageComponentCollector({
                filter : (b) => {
                    if(b.user.id === message.author.id) return true;
                    else{
                        return b.reply({content : `${client.emoji.cross} | You are not authorized to take this action.` , ephemeral : true})
                    }
                },
                time : 50000,
                idle : 50000/2
            });
            collector.on('collect',async b => {
                if(!msg) return;
                if(b.isSelectMenu())
                {
                    for(const value of b.values){
                        if(value === `p1`)
                        {
                            if(!msg) return;
                            if(an.includes(user.id)) { return b.reply({content : `${client.emoji.cross} | Unsuccessful Addition ${user} is already in my whitelist.`,ephemeral : true})}
                            an.push(user.id);
                            await client.data3.set(`whitelist_${message.guild.id}`,an);
                            return b.reply({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.tick} | SuccessFully Added ${user} into my antinuke whitelist.`)],ephemeral : true})
                        }
                        if(value === `p2`)
                        {
                            if(!msg) return;
                            if(lol.includes(user.id)) { return b.reply({content : `${client.emoji.cross} | Unseccessful Addition ${user} is already in my whitelist.`,ephemeral : true})}
                            lol.push(user.id);
                            await client.data3.set(`wlEv_${message.guild.id}`,lol);
                            return b.reply({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.tick} | SuccessFully Added ${user} into my everyone whitelist.`)],ephemeral : true})
                        }
                        if(value === `p3`)
                        {
                            if(!msg) return;
                            if(ok1.includes(user.id)) { return b.reply({content : `${client.emoji.cross} | Unseccessful Addition ${user} is already in my whitelist`,ephemeral : true})}
                            ok1.push(user.id);
                            await client.data3.set(`antiLinks_${message.guild.id}`,ok1);
                            return b.reply({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.tick} | SuccessFully Added ${user} into my antiInvite whitelist.`)],ephemeral : true})
                        }
                    }
                }
            });

            collector.on('end',async(b) => {
                if(!msg) return;
                await msg.edit({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`**TIMED OUT! RUN WHITELIST COMMAND AGAIN.**`)],components : []})
            });
        }
        if(opt === `remove`)
        {
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
            if(!user) {
                return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | Please provide me a valid user.`)]})
            }
            let em = new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.arrow} Choose the Categories Below`).setTitle(`${client.user.username.toUpperCase()} WHITELISTING PANEL`)
            let ro = new MessageActionRow().addComponents(
                new MessageSelectMenu().setCustomId(`help`).setPlaceholder(`> ${client.user.username} Whitelisting Categories`).addOptions([
                    {
                        label : `AntiNuke`,
                        value : `p4`,
                        description : `Whitelists a user from all kind of Antinuke`,
                        emoji : `${client.emoji.antinuke}`
                    },
                    {
                        label : `Everyone`,
                        value : `p5`,
                        description : `Whitelists a user from anti-everyone`,
                        emoji : `${client.emoji.everyone}`
                    },
                    {
                        label : `Invite`,
                        value : `p6`,
                        description : `Whitelists a user from anti-invite`,
                        emoji : `${client.emoji.invites}`
                    }
                ])
            );

            const msg = await message.channel.send({embeds : [em] , components : [ro]});


            const collector = await msg.createMessageComponentCollector({
                filter : (b) => {
                    if(b.user.id === message.author.id) return true;
                    else{
                        return b.reply({content : `${client.emoji.cross} | You are not authorized to take this action.` , ephemeral : true})
                    }
                },
                time : 50000,
                idle : 50000/2
            });
            collector.on('collect',async b => {
                
                if(b.isSelectMenu())
                {
                    for(const value of b.values){
                        if(value === `p4`)
                        {
                            if(!msg) return;
                            if(!an.includes(user.id)) { return b.reply({content : `${client.emoji.cross} | Unsuccessful Removal ${user} is not in my whitelist.`,ephemeral : true})}
                            let lolvai = an.filter(x => x !== user.id);
                            await client.data3.set(`whitelist_${message.guild.id}`,lolvai);
                            return b.reply({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.tick} | SuccessFully Removed ${user} into my antinuke whitelist.`)],ephemeral : true})
                        }
                        if(value === `p5`)
                        {
                            if(!msg) return;
                            if(!lol.includes(user.id)) { return b.reply({content : `${client.emoji.cross} | Unseccessful Removal ${user} is not in my whitelist.`,ephemeral : true})}
                            let okvai = lol.filter(x => x !== user.id);
                            await client.data3.set(`wlEv_${message.guild.id}`,okvai);
                            return b.reply({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.tick} | SuccessFully Removed ${user} into my everyone whitelist.`)],ephemeral : true})
                        }
                        if(value === `p6`)
                        {
                            if(!msg) return;
                            if(!ok1.includes(user.id)) { return b.reply({content : `${client.emoji.cross} | Unseccessful Removal ${user} is not in my whitelist`,ephemeral : true})}
                            let shit = ok1.filter(x => x !== user.id);
                            await client.data3.set(`antiLinks_${message.guild.id}`,shit);
                            return b.reply({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.tick} | SuccessFully Removed ${user} into my antiInvite whitelist.`)],ephemeral : true})
                        }
                    }
                }
            });

            collector.on('end',async(b) => {
                if(!msg) return;
                await msg.edit({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`**TIMED OUT! RUN WHITELIST COMMAND AGAIN.**`)],components : []})
            });
        }
    }
}