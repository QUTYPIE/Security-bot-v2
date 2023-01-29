const moment = require(`moment`);
require(`moment-duration-format`);
module.exports = {
    name : `uptime`,
    aliases : ['upt'],
    punitop : false,
    adminPermit : false,
    ownerPermit : false,
    cat : 'info',
    run : async(client,message,args,prefix) => {
        const time = moment.duration(message.client.uptime).format(`D[days], H[hrs], m[mins], s[secs]`);
        return message.channel.send({content : `${client.emoji.uptime} | My uptime : \`${time}\``});
    }
}