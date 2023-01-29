const { MessageEmbed } = require(`discord.js`);

module.exports ={
    name : "ownerPermit",
    aliases : ["ownerpermit","ospermit","opermit"],
    cat : 'security',
    punitop : false,
    run : async(client,message,args,prefix) => {
        if(message.author.id !== message.guild.ownerId && !client.config.owner.includes(message.author.id))
        {
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} Only Guild Owner is allowed to run this command.`)]})
        }

        let a = await client.data.get(`ownerPermit1_${message.guild.id}`);
        let b = await client.data.get(`ownerPermit2_${message.guild.id}`);

        if(!args[0])
        {
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross}  Usage : \`${prefix}ownerPermit <add/remove/show>\``).setAuthor({name : `| Wrong Implementation` , iconURL : message.author.displayAvatarURL({dynamic : true})})]});
        }
        let opt = args[0].toLowerCase();

        if(opt == "show")
        {
            let ans = "";
            if(a == null) { ans += `` }
            else {ans += `\n<@${a}>`}

            if(b == null) { ans += ``}
            else { ans += `\n<@${b}>` }

            if(ans == ``){
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} This Guild don't have any Owner Permit users. Add it to know more.`)]});}

            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${ans}`).setAuthor({name : `| Owner Permit List` , iconURL : message.guild.iconURL({dynamic : true})})]});
        }


        let user = message.guild.members.cache.get(args[1]) || message.mentions.members.first();
        if(!user)
        {
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} Please provide me a valid user.`).setAuthor({name : `| Wrong Implementation` , iconURL : message.guild.iconURL({dynamic : true})})]});
        }
        if(opt == "add")
        {
            if(a == null) client.data.set(`ownerPermit1_${message.guild.id}`,user.id);
            else if(b == null) client.data.set(`ownerPermit2_${message.guild.id}`,user.id);
            else return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} You cannot set more than 2 users to Owner Permit of Client.`)]})

            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.tick} SuccessFully Added ${user} to my Owner Permit.`).setAuthor({name : `| Authorized` , iconURL : message.guild.iconURL({dynamic : true})})]});
        }
        if(opt == "remove")
        {
            if(user.id === a) { client.data.delete(`ownerPermit1_${message.guild.id}`) }
            else if(user.id === b) { client.data.delete(`ownerPermit2_${message.guild.id}`) }
            else return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} The provided user is not present in Owner Permit List.`)]})

            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} SuccessFully Removed ${user} from my Owner Permit.`).setAuthor({name : `| Unauthorized`  ,iconURL : message.guild.iconURL({dynamic : true})})]});
        }
    }
}