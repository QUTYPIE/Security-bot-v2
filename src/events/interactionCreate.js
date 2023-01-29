const { MessageEmbed , MessageActionRow, MessageButton } = require("discord.js")

module.exports = async(client) => {
    client.on("interactionCreate",async interaction => {
        if(interaction.isButton())
        {
            if(interaction.customId == `ini_setup`)
            {
                if(interaction.member.id !== interaction.guild.ownerId && !client.config.owner.includes(interaction.member.id))
                {
                    return interaction.reply({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | You are not authorized to take this action...`)],ephemeral : true})
                }
                else {
                var ans;
                let data = await client.data2.get(`setup_${interaction.guild.id}`);
                if(!data) await client.data2.set(`setup_${interaction.guild.id}`,`none`);
                if(data == `beast`) { ans = `Beast Mode` }
                if(data == `secure`) { ans = `Secure Mode` }
                if(data == `none`) { ans = `None` }
                let em = new MessageEmbed().setColor(`#2f3136`).setDescription(
                    `**Current setup mode is set to - \`${ans}\`**
            
                    ${client.emoji.dot} __**Secure Mode**__ ?
                    Secure Mode is the safer mode to secure your server using **Quarantine System**
                    1. It operates the offender by **Quarantaining**.
                    2. It don't removes the offender from the user.
                    
                    ${client.emoji.dot} __**Beast Mode**__ ?
                    Beast Mode is powerful mode to secure your server using **Discord Powers**
                    1. It operates the offender by **Banning**.
                    2. It bans the offender by Discord Powers.`
                ).setFooter({text : `It is recommended to use our beast mode.`}).setAuthor({name : `| ${client.user.username.toUpperCase()} SETUP` , iconURL : interaction.guild.iconURL({dynamic : true})})
                let ok = new MessageActionRow().addComponents(
                    new MessageButton().setStyle(`SUCCESS`).setLabel(`Secure Mode`).setCustomId(`secure`),
                    new MessageButton().setStyle(`DANGER`).setLabel(`Beast Mode`).setCustomId(`beast`),
                    new MessageButton().setStyle(`SECONDARY`).setLabel(`None`).setCustomId(`no`)
                );
                return interaction.update({embeds : [em] , components : [ok]}); }
            }
            if(interaction.customId == `no`)
            {
                if(interaction.member.id !== interaction.guild.ownerId && !client.config.owner.includes(interaction.member.id))
                {
                    return interaction.reply({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | You are not authorized to take this action...`)],ephemeral : true})
                }
                let d = await client.data2.get(`setup_${interaction.guild.id}`);
                    if(!d) await client.data2.set(`setup_${interaction.guild.id}`,`none`);
                    if(d == `none`)
                    {
                        return interaction.reply({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | Security Mode is already setupped to - **\`NONE\`**`)],ephemeral : true})
                    }
                else{
                await client.data2.set(`setup_${interaction.guild.id}`,`none`);
                return interaction.update({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(
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
                ).setFooter({text : `SECURITY MODE : NONE` , iconURL : interaction.guild.iconURL({dynamic : true})})],components : []}) }
            }
            if(interaction.customId == `secure`)
            {
                if(interaction.member.id !== interaction.guild.ownerId && !client.config.owner.includes(interaction.member.id))
                {
                    return interaction.reply({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | You are not authorized to take this action...`)],ephemeral : true})
                }
                let d = await client.data2.get(`setup_${interaction.guild.id}`);
                if(!d) await client.data2.set(`setup_${interaction.guild.id}`,`none`);
                if(d == `secure`)
                {
                    return interaction.reply({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | Security Mode is already setupped to - **\`SECURE MODE\`**`)],ephemeral : true})
                }
                else{
                    let qrole = await client.data.get(`qrole_${interaction.guild.id}`);
                    if(!qrole || !interaction.guild.roles.cache.get(qrole)){
                        let r = await interaction.guild.roles.create({
                            name : "Blacklisted",
                            mentionable : false,
                            color : `#587679`,
                            hoist : false,
                            permissions : []
                        });
                        await client.data.set(`qrole_${interaction.guild.id}`,r.id);
                        interaction.guild.roles.cache.get(r.id).setPosition(interaction.guild.me.roles.highest.rawPosition - 1);
                        interaction.guild.channels.cache.forEach(x => x.permissionOverwrites.edit(r.id,{VIEW_CHANNEL : false}));
                    }
                    qrole = await client.data.get(`qrole_${interaction.guild.id}`);
                    if(qrole && interaction.guild.roles.cache.get(qrole)) interaction.guild.roles.cache.get(qrole).setPosition(interaction.guild.me.roles.highest.rawPosition - 1);
                    interaction.guild.channels.cache.forEach(x => x.permissionOverwrites.edit(qrole,{VIEW_CHANNEL : false},`${client.user.username.toUpperCase()} SECURE MODE SETUP`));
                    client.data2.set(`setup_${interaction.guild.id}`,`secure`);
                    return interaction.update({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(
                        `${client.emoji.tick} Setup Finished.
                        ${client.emoji.tick} Setupped Blacklisted Role in the server..
                        ${client.emoji.tick} Overwrited Blacklisted Role permissions..
                        
                        *Note - Please place my role at the top for better results..*
                        **OR** *You may use Beast mode for best results...*`
                    )],components : []});
                }
            }
            if(interaction.customId == `beast`)
            {
                if(interaction.member.id !== interaction.guild.ownerId && !client.config.owner.includes(interaction.member.id))
                {
                    return interaction.reply({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | You are not authorized to take this action...`)],ephemeral : true})
                }
                else{
                    if(interaction.guild.me.roles.highest.rawPosition <= interaction.guild.roles.highest.rawPosition - 2)
                    {
                        return interaction.reply({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | Please place my role position above top 3 in order to protect your server..`)],ephemeral : true});
                    }
                    let d = await client.data2.get(`setup_${interaction.guild.id}`);
                    if(!d) await client.data2.set(`setup_${interaction.guild.id}`,`none`);
                    if(d == `beast`)
                    {
                        return interaction.reply({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | Security Mode is already setupped to - **\`BEAST MODE\`**`)],ephemeral : true})
                    }
                    else{
                        let qrole = await client.data.get(`qrole_${interaction.guild.id}`);
                        if(!qrole || !interaction.guild.roles.cache.get(qrole)) { };
                        if(qrole || interaction.guild.roles.cache.get(qrole)) { interaction.guild.roles.cache.get(qrole).delete().catch(() => {}); client.data.delete(`qrole_${interaction.guild.id}`); }
                       try { interaction.guild.roles.cache.filter(x => x.permissions.has("KICK_MEMBERS" || "BAN_MEMBERS" || ['KICK_MEMBERS','BAN_MEMBERS']) ).forEach(r => r.setPermissions(["VIEW_CHANNEL","READ_MESSAGE_HISTORY","SEND_MESSAGES","CONNECT","SPEAK"],`${client.user.username.toUpperCase()} BEAST SECURITY | DANGEROUS PERMISSIONS`)) } catch(e) { console.error(e) }
                        client.data2.set(`setup_${interaction.guild.id}`,`beast`);
                        return interaction.update({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(
                            `${client.emoji.tick} Setup Finished.
                            ${client.emoji.tick} Setupped Roles Permissions for the server...
                            ${client.emoji.tick} Removed Dangerous permissions for the server...
                            
                            *Note - Don't place my role lower because i can take action on roles lower to me only.*`
                        )],components : []})
                    }
                }
            }
            if(interaction.customId == `cmd_delete`)
            {
                if(!client.config.owner.includes(interaction.member.id))
                {
                    return interaction.reply({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | You are not authorized to take this action..`)],ephemeral : true})
                }
                else {
                    interaction.message.delete().catch(() => {});
                }
            }
        }
    })
}