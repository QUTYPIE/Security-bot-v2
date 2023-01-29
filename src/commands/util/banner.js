const { MessageEmbed , MessageActionRow , MessageButton } = require(`discord.js`);
module.exports = {
    name : `banner`,
    aliases : [""],
    punitop : false,
    cat : 'util',
    adminPermit : false,
    ownerPermit : false,
    run : async(client,message,args,prefix) => {
        if(!args[0])
        {
            return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | Command Usage : \`${prefix}banner <server/user> [user_id]\``)]})
        }

        let opt = args[0].toLowerCase();
        if(opt === `server`)
        {
            if(!message.guild.banner){
                return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | This Guild don't have any banner.`)]})
            }
            else{
                let em = new MessageEmbed().setColor(`#2f3136`).setDescription(`[Click here to get the server banner](${message.guild.bannerURL({dynamic : true , size : 4096 , format : 'gif'})})`).setImage(message.guild.bannerURL({dynamic : true , size : 4096})).setAuthor({name : `${message.guild.name}'s Server Banner`}).setFooter({text : `Requested By : ${message.author.tag}` , iconURL : message.author.displayAvatarURL({dynamic : true})})
                return message.channel.send({embeds : [em]});
            }
        }
        if(opt === `user`)
        {
            const user = message.mentions.users.first() || client.users.cache.get(args[1]) || message.author;

        let banner = false;
        try{
            await user.fetch().then(user => {
                if(user.banner){
                    banner = user.bannerURL({
                        dynamic : true,
                        size : 4096
                    })
                }
            }).catch(() => {})
        } catch(e){
            console.log(e)
        }
        if(banner){
            const em = new MessageEmbed().setColor("#2f3136").setAuthor({name : `${user.tag}'s banner`, iconURL : client.user.displayAvatarURL({dynamic : true})}).setImage(banner).setFooter({text : `Requested By : ${message.author.tag}`,iconURL : message.author.displayAvatarURL({dynamic : true})}).addFields([
                {name : `__Download Links__` , value : `[PNG](${user.bannerURL({dynamic : true,size : 4096,format : "png"})}) | [JPG](${user.bannerURL({dynamic : true,size : 4096,format : "jpg"})}) | [GIF](${user.bannerURL({dynamic : true,size : 4096,format : "gif"})})`}
            ])
            return message.channel.send({embeds : [em]});
        }
        else{
            message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`${client.emoji.cross} | This User don't have any Banner.`)]});
        }
        }
    }
}