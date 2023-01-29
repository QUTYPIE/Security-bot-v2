const { MessageEmbed } = require(`discord.js`);

module.exports ={
    name : "adminPermit",
    aliases : ["adminpermit","admpermit","apermit"],
    cat : "security",
    run : async(client,message,args,prefix) => {
        if(message.author.id !== message.guild.ownerId && !client.config.owner.includes(message.author.id))
        {
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} Only Guild Owner is allowed to run this command.`)]})
        }

        let a = await client.data.get(`adminPermit1_${message.guild.id}`);
        let b = await client.data.get(`adminPermit2_${message.guild.id}`);
        let c = await client.data.get(`adminPermit3_${message.guild.id}`);
        let d = await client.data.get(`adminPermit4_${message.guild.id}`);
        let e = await client.data.get(`adminPermit5_${message.guild.id}`);

        if(!args[0])
        {
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross}  Usage : \`${prefix}admipermit <add/remove/show>\``).setAuthor({name : `| Wrong Implementation` , iconURL : message.author.displayAvatarURL({dynamic : true})})]});
        }
        let opt = args[0].toLowerCase();

        if(opt == "show")
        {
            let ans = "";
            if(a == null) { ans += `` }
            else {ans += `\n<@${a}>`}

            if(b == null) { ans += ``}
            else { ans += `\n<@${b}>` }

            if(c == null) { ans += ``}
            else { ans += `\n<@${c}>` }

            if(d == null) { ans += ``}
            else { ans += `\n<@${d}>` }

            if(e == null) { ans += ``}
            else { ans += `\n<@${e}>` }

            if(ans == ``){
                return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} This Guild don't have any Admin Permit users. Add it to know more.`)]});
            }

            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${ans}`).setAuthor({name : `| Admin Permit List` , iconURL : message.guild.iconURL({dynamic : true})})]});
        }


        let user = message.guild.members.cache.get(args[1]) || message.mentions.members.first();
        if(!user)
        {
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} Please provide me a valid user.`).setAuthor({name : `| Wrong Implementation` , iconURL : message.guild.iconURL({dynamic : true})})]});
        }
        if(opt == "add")
        {
            if(a == null) client.data.set(`adminPermit1_${message.guild.id}`,user.id);
            else if(b == null) client.data.set(`adminPermit2_${message.guild.id}`,user.id);
            else if(c == null) client.data.set(`adminPermit3_${message.guild.id}`,user.id);
            else if(d == null) client.data.set(`adminPermit4_${message.guild.id}`,user.id);
            else if(e == null) client.data.set(`adminPermit5_${message.guild.id}`,user.id);
            else return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} You cannot set more than 5 users to Admin Permit of Client.`)]})

            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.tick} SuccessFully Added ${user} to my Admin Permit.`).setAuthor({name : `| Authorized` , iconURL : message.guild.iconURL({dynamic : true})})]});
        }
        if(opt == "remove")
        {
            if(user.id === a) { client.data.delete(`adminPermit1_${message.guild.id}`) }
            else if(user.id === b) { client.data.delete(`adminPermit2_${message.guild.id}`) }
            else if(user.id === c) { client.date.delete(`adminPermit3_${message.guild.id}`) }
            else if(user.id === d) { client.data.delete(`adminPermit4_${message.guild.id}`) }
            else if(user.id === e) { client.data.delete(`adminPermit5_${message.guild.id}`) }
            else return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} The provided user is not present in Admin Permit List.`)]})

            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} SuccessFully Removed ${user} from my Admin Permit.`).setAuthor({name : `| Unauthorized`  ,iconURL : message.guild.iconURL({dynamic : true})})]});
        }
    }
}