const { MessageEmbed , Permissions , MessageActionRow , MessageButton, Collection } = require("discord.js");
module.exports = async(client) => {
    client.on("messageCreate",async message => {
        if(!message.guild || message.author.bot) return;

        let bl = await client.data2.get(`blacklist_${client.user.id}`);
        if(!bl || bl === null) { await client.data2.set(`blacklist_${client.user.id}`,[]) }
        let sh = [];
        bl.forEach(x => sh.push(x));
        if(sh.includes(message.author.id))
        {
            let em = new MessageEmbed().setColor(`#2f3136`).setAuthor({name : `Blacklisted!`}).setDescription(`${client.emoji.cross} | You have been blacklisted from using my commands.Head to our [support server](${client.config.support_serer_link}) to check the reason and its solution.`).setThumbnail(message.author.displayAvatarURL({dynamic : true}));
            let b1 = new MessageActionRow().addComponents(new MessageButton().setStyle(`LINK`).setLabel(`Support`).setURL(`${client.config.support_serer_link}`));
            return message.channel.send({embeds : [em] , components : [b1]}).catch((err) => {
            });
        }

        let prefix = client.config.prefix;
        let prefixData = await client.data.get(`prefix_${message.guild.id}`);
        if(!prefixData) { prefix = client.config.prefix }
        else if(prefixData) { prefix = prefixData };

        if(message.content === `<@${client.user.id}>`)
        {
            const b1 = new MessageButton().setLabel("Invite").setStyle('LINK').setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
            const b2 = new MessageButton().setLabel("Support").setStyle('LINK').setURL("https://discord.gg/c5VbdzYajq")
            const row = new MessageActionRow().addComponents(b1,b2);
            const emb = new MessageEmbed().setColor(`#2f3136`).setAuthor({name : `| Hey I am ${client.user.username}` , iconURL : message.guild.iconURL({dynmaic : true})}).setDescription(
                `${client.emoji.arrow} My prefix for the server : \`${prefix}\`

${client.emoji.dot} Try me with command - \`${prefix}help\` or \`${prefix}setup\`

${client.emoji.dot} AntiNuke Command - \`${prefix}antinuke\``
            ).setThumbnail(message.author.displayAvatarURL({dynamic : true}))
           return message.channel.send({embeds : [emb],components : [row]}).catch((e) => {console.log(e)});
        }

        let npArray = [];
       
        const botregex = RegExp(`^<@!?${client.user.id}>( |)`)
        let pre = message.content.match(botregex) ? message.content.match(botregex)[0] : prefix;
        if(!message.content.startsWith(pre)) return;
        

        const args = message.content.slice(pre.length).trim().split(/ +/);
        const cmnd = args.shift().toLowerCase();
        const cmd = client.commands.get(cmnd) || client.commands.find((c) => c.aliases && c.aliases.includes(cmnd));
        if(!cmd) return;


        if(!message.guild.me.permissionsIn(message.channel).has(Permissions.FLAGS.VIEW_CHANNEL)) return message.author.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} **|** I don't have \`VIEW_CHANNEL\` Permissions in that channel`)]}).catch(() => {});
        if(!message.guild.me.permissionsIn(message.channel).has(Permissions.FLAGS.SEND_MESSAGES)) return message.author.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} **|** I don't have \`SEND_MESSAGES\` permissions in that channel.`)]}).catch(() => {});
        if(!message.guild.me.permissionsIn(message.channel).has(Permissions.FLAGS.EMBED_LINKS)) return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} **|** I don't have \`EMBED_LINKS\` permissions in this channel.`)]})
        if(!message.guild.me.permissionsIn(message.channel).has(Permissions.FLAGS.USE_EXTERNAL_EMOJIS)) return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} **|** I don't have \`USE_EXTERNAL_EMOJIS\` permissions in this channel.`)]})

        if(cmd.punitop && !client.config.owner.includes(message.author.id))
        {
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} **|** This command is an owner command.You cannot use this.`)]})
        }
        if(cmd.adminPermit)
        {
            let adminData = [];
            let a = await client.data.get(`adminPermit1_${message.guild.id}`);
            let b = await client.data.get(`adminPermit2_${message.guild.id}`);
            let c = await client.data.get(`adminPermit3_${message.guild.id}`);
            let d = await client.data.get(`adminPermit4_${message.guild.id}`);
            let e = await client.data.get(`adminPermit5_${message.guild.id}`);
            adminData.push(a,b,c,d,e);

            let ownerData = [];
            let f = await client.data.get(`ownerPermit1_${message.guild.id}`);
            let g = await client.data.get(`ownerPermit2_${message.guild.id}`);
            ownerData.push(f,g);

            if(!client.config.owner.includes(message.author.id) && !adminData.includes(message.author.id) && message.guild.ownerId !== message.author.id && !ownerData.includes(message.author.id))
            {
                return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setAuthor({name : `| Unauthorized` , iconURL : message.guild.iconURL({dynamic : true})}).setDescription(`${client.emoji.cross} You need my Admin Permit to run this command.`)]})
            }
        }
        if(cmd.ownerPermit)
        {
            let ownerData = [];
            let f = await client.data.get(`ownerPermit1_${message.guild.id}`);
            let g = await client.data.get(`ownerPermit2_${message.guild.id}`);
            ownerData.push(f,g);
            if(!client.config.owner.includes(message.author.id) && !ownerData.includes(message.author.id) && message.guild.ownerId !== message.author.id)
            {
                return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setAuthor({name : `| Unauthorized` , iconURL : message.guild.iconURL({dynamic : true})}).setDescription(`${client.emoji.cross} You need my Owner Permit to run this command.`)]})
            }
        }
        if(!client.config.owner.includes(message.author.id)){
        if(!client.cools.has(cmd.name))
        {
            client.cools.set(cmd.name,new Collection());
        }
        const now = Date.now();
        const ts = client.cools.get(cmd.name);
        const cool = (cmd.cool || 3) * 1000;
        if(ts.has(message.author.id))
        {
            let exp = ts.get(message.author.id) + cool;
            if(now < exp){
                let time = (exp - now) / 1000;
                return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | You are being **Rate-Limited** Please wait till \`${time.toFixed(1)}s\``)]}).then(m => {setTimeout(() => {m.delete()},6000)})
            }
        }
        ts.set(message.author.id,now);
    }
        
        await cmd.run(client,message,args,prefix).catch((e) => {console.log(e)})
    })
}