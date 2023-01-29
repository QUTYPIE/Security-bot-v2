const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js")

module.exports = {
    name : `help`,
    aliases : ['h'],
    punitop : false,
    adminPermit : false,
    ownerPermit : false,
    cat : 'info',
    run : async(client,message,args,prefix) => {
        let em = new MessageEmbed().setColor(`#2f3136`).setAuthor({name : `${client.user.username} Help Panel` , iconURL : client.user.displayAvatarURL()}).setDescription(
            `${client.emoji.arrow} Hey ${message.author} It's ${client.user.username} here
            You are in front of my Help Menu!
            Basically I am a security bot to secure your \n servers with powerful modules
            ${client.emoji.arrow} [Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands) | [Support](${client.config.support_server_link})`
        ).addFields([
            {name : `Choose Categories Below` , value : `${client.emoji.antinuke} \`:\` Security \n ${client.emoji.admin} \`:\` Admin \n ${client.emoji.info} \`:\` Information \n ${client.emoji.utility} \`:\` Utility \n ${client.emoji.owner} \`:\` Owner`}
        ]).setThumbnail(message.author.displayAvatarURL({dynamic : true})).setFooter({text : `Just A Powerful Discord bot` , iconURL : message.guild.iconURL({dynamic : true})});

        let r1 = new MessageActionRow().addComponents(
            new MessageSelectMenu().setCustomId(`he`).setPlaceholder(`> ${client.user.username} Command Categories`).addOptions([
                {
                    label : `Home`,
                    emoji : `${client.emoji.home}`,
                    value : `h1`,
                    description : `Takes you to the main page`
                },
                {
                    label : `Security`,
                    emoji : `${client.emoji.antinuke}`,
                    value : `h2`,
                    description : `Shows Antinuke and Security Commands`
                },
                {
                    label : `Admin`,
                    emoji : `${client.emoji.admin}`,
                    value : `h3`,
                    description : `Shows the Administrator Commands`
                },
                {
                    label : `Information`,
                    emoji : `${client.emoji.info}`,
                    value : `h5`,
                    description : `Shows the bot Information Commands`
                },
                {
                    label : `Utility`,
                    emoji : `${client.emoji.utility}`,
                    value : `h6`,
                    description : `Shows the utility commands`
                },
                {
                    label : `Owner`,
                    emoji : `${client.emoji.owner}`,
                    value : `h7`,
                    description : `Shows the Bot Owner Commands`
                }
            ])
        );

        let r2 = new MessageActionRow().addComponents(
            new MessageButton().setStyle(`PRIMARY`).setCustomId(`lol1`).setEmoji(`${client.emoji.left2}`),
            new MessageButton().setStyle(`SECONDARY`).setCustomId(`lol2`).setEmoji(`${client.emoji.left1}`),
            new MessageButton().setStyle(`DANGER`).setCustomId(`lol3`).setEmoji(`${client.emoji.home}`),
            new MessageButton().setStyle(`SECONDARY`).setCustomId(`lol4`).setEmoji(`${client.emoji.right1}`),
            new MessageButton().setStyle(`PRIMARY`).setCustomId(`lol5`).setEmoji(`${client.emoji.right2}`)
        );

        let msg = await message.channel.send({embeds : [em] , components : [r2,r1]});
        let page = 0;

        let embed1 = new MessageEmbed().setColor(`#2f3136`).addFields({name : `Security Commands` , value : `${client.commands.filter(x => x.cat && x.cat === `security`).map(x => `\`${x.name}\``).sort().join(', ')}`}).setAuthor({name : `| Security Commands` , iconURL : client.user.displayAvatarURL()})
        let embed2 = new MessageEmbed().setColor(`#2f3136`).addFields({name : `Admin Commands` , value : `${client.commands.filter(x => x.cat && x.cat === `admin`).map(x => `\`${x.name}\``).sort().join(', ')}`}).setAuthor({name : `| Admin Commands` , iconURL : client.user.displayAvatarURL()})
        let embed3 = new MessageEmbed().setColor(`#2f3136`).addFields({name : `Information Commands` , value : `${client.commands.filter(x => x.cat && x.cat === `info`).map(x => `\`${x.name}\``).sort().join(', ')}`}).setAuthor({name : `| Information Commands` , iconURL : client.user.displayAvatarURL()})
        let embed4 = new MessageEmbed().setColor(`#2f3136`).addFields({name : `Utility Commands` , value : `${client.commands.filter(x => x.cat && x.cat === `util`).map(x => `\`${x.name}\``).sort().join(', ')}`}).setAuthor({name : `| Utility Commands` , iconURL : client.user.displayAvatarURL()})
        let embed5 = new MessageEmbed().setColor(`#2f3136`).addFields({name : `Owner Commands` , value : `${client.commands.filter(x => x.cat && x.cat === `punit`).map(x => `\`${x.name}\``).sort().join(', ')}`}).setAuthor({name : `| Owner Commands` , iconURL : client.user.displayAvatarURL()})
        var embeds = [];
        embeds.push(embed1);embeds.push(embed2);embeds.push(embed3);embeds.push(embed4);embeds.push(embed5);

        const collector = await msg.createMessageComponentCollector({
            filter :(interaction) => {
                if(message.author.id === interaction.user.id) return true;
                else{
                    interaction.reply({content : `${client.emoji.cross} | That's not your session run : \`${prefix}help\` to create your own.` , ephemeral : true})
                }
            },
            time : 100000,
            idle : 100000/2
        });

        collector.on('collect',async(interaction) => {
            if(interaction.isSelectMenu())
            {
                for(const value of interaction.values)
                {
                    if(value === `h1`)
                    {
                        let em = new MessageEmbed().setColor(`#2f3136`).setAuthor({name : `${client.user.username} Help Panel` , iconURL : client.user.displayAvatarURL()}).setDescription(
                            `${client.emoji.arrow} Hey ${interaction.member} It's ${client.user.username} here
                            You are in front of my Help Menu!
                            Basically I am a security bot to secure your \n servers with powerful modules
                            ${client.emoji.arrow} [Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands) | [Support](${client.config.support_server_link})`
                        ).addFields([
                            {name : `Choose Categories Below` , value : `${client.emoji.antinuke} \`:\` Security \n ${client.emoji.admin} \`:\` Admin \n ${client.emoji.info} \`:\` Information \n ${client.emoji.utility} \`:\` Utility \n ${client.emoji.owner} \`:\` Owner`}
                        ]).setThumbnail(interaction.user.displayAvatarURL({dynamic : true})).setFooter({text : `Just A Powerful Discord bot` , iconURL : interaction.guild.iconURL({dynamic : true})});
                        return interaction.update({embeds : [em]});
                    }
                    if(value === `h2`)
                    {
                        return interaction.update({embeds : [embed1]});
                    }
                    if(value === `h3`)
                    {
                        return interaction.update({embeds : [embed2]});
                    }
                    if(value === `h5`)
                    {
                        return interaction.update({embeds : [embed3]});
                    }
                    if(value === `h6`)
                    {
                        return interaction.update({embeds : [embed4]});
                    }
                    if(value === `h7`)
                    {
                        return interaction.update({embeds : [embed5]});
                    }
                }
            }
            if(interaction.isButton())
            {
                if(interaction.customId === `lol4`)
                {
                    page = page + 1 < embeds.length ? ++page : 0;
                    return interaction.update({embeds : [embeds[page]]});
                }
                if(interaction.customId === `lol5`)
                {
                    page = page + 1 < embeds.length ? ++page : 0;
                    page = page + 1 < embeds.length ? ++page : 0;
                    return interaction.update({embeds : [embeds[page]]});
                }
                if(interaction.customId === `lol3`)
                {
                    return interaction.update({embeds : [em]})
                }
                if(interaction.customId === `lol2`)
                {
                    page = page > 0 ? --page : embeds.length - 1;
                    return interaction.update({embeds : [embeds[page]]});
                }
                if(interaction.customId === `lol1`)
                {
                    page = page > 0 ? --page : embeds.length - 1;
                    page = page > 0 ? --page : embeds.length - 1;
                    return interaction.update({embeds : [embeds[page]]})
                }
            }
        });
        collector.on('end',async() => {
            msg.edit({embeds : [em] , components : [] , content : `${client.emoji.info} | Help Query Got Timed Out!`})
        });
    }
}