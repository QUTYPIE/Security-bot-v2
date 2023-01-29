module.exports = async(client) => {
    client.on("messageCreate",async message => {
        if(message.mentions.everyone)
        {
            if(message.member.id == client.user.id) return;
            if(message.member.id == message.guild.ownerId) return;
            let wl = await client.data3.get(`wlEv_${message.guild.id}`);
            if(!wl || wl == null) { await client.data3.set(`wlEv_${message.guild.id}`,[]) }
            if(wl.includes(message.member.id)) return;


            let set = await client.data2.get(`setup_${message.guild.id}`);
            if(!set || set == null) { await client.data2.set(`setup_${message.guild.id}`,`none`) }
            if(set == `none`) return;

            message.delete().catch(() => { });

            if(set == `secure`)
            {
                try{
                let qRole = await client.data.get(`qrole_${message.guild.id}`);
                if(!qRole || !message.guild.roles.cache.get(qRole)) { await client.data2.set(`setup_${message.guild.id}`,`beast`); return message.member.ban({reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI EVERYONE | QUARANTINE ROLE NOT FOUND`}) }
                else{
                    let roles = [];
                    message.member.roles.cache.filter(x => x.id !== message.guild.roles.everyone.id).forEach(r => roles.push(r.id));
                    client.data.set(`roles_${message.member.id}`,roles);
                   try{ message.member.roles.add(qRole,`${client.user.username.toUpperCase()} SECURE MODE | ANTI EVERYONE`); } catch(e) { }
                    message.member.roles.cache.filter(x => x.id !== message.guild.roles.everyone.id).forEach(r => message.member.roles.remove(r.id).catch(() => { message.member.roles.cache.forEach(r => r.edit({permissions : []},`${client.user.username.toUpperCase()} SECURE MODE | ANTI EVERYONE`)) })); 
                }
            } catch(e) { message.guild.members.ban(message.author.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI EVERYONE | CAN'T QUARANTINE`})}
            }
            if(set == `beast`)
            {
                message.guild.members.ban(message.author.id,{reason : `${client.user.username.toUpperCase()} BEAST MODE | ANTI EVERYONE`} ).catch((e) => { console.log(e) });
            }
        }
        
    });
}