const { MessageEmbed , ClientEvents } = require(`discord.js`);
module.exports = async(client) => {
    client.on('guildBanAdd',async member => {
        let logs = await member.guild.fetchAuditLogs({type : `MEMBER_BAN_ADD`}).then(x => x.entries.first());
        if(!logs) return;
        if(logs.executor.id == client.user.id) return;
        if(logs.executor.id == member.guild.ownerId) return;

        let set = await client.data2.get(`setup_${member.guild.id}`);
        if(!set || set == null) { await client.data2.set(`setup_${member.guild.id}`,`none`) }
        if(set == `none`) return;

        let wl = await client.data3.get(`whitelist_${member.guild.id}`);
        if(!wl || wl == null) { await client.data3.set(`whitelist_${member.guild.id}`,[]) }
        if(wl.includes(logs.executor.id))return;

        member.guild.members.unban(logs.target.id,`${client.user.username.toUpperCase()} AUTO RECOVERY | ANTI BAN`);

        if(set == `secure`)
        {
            try{
            let qRole = await client.data.get(`qrole_${member.guild.id}`);
            if(!qRole || !member.guild.roles.cache.get(qRole)) { await client.data2.set(`setup_${member.guild.id}`,`beast`); return member.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI BAN | QUARANTINE ROLE NOT FOUND`}) }
            else{
                let roles = [];
                let m = member.guild.members.cache.get(logs.executor.id);
                m.roles.cache.filter(x => x.id !== member.guild.roles.everyone.id).forEach(x => roles.push(x.id));
                client.data.set(`roles_${m.id}`,roles);
               try{ m.roles.add(qRole,`${client.user.username.toUpperCase()} SECURE MODE | ANTI BAN`) } catch(e) { }
                m.roles.cache.filter(x => x.id !== member.guild.roles.everyone.id).forEach(r => m.roles.remove(r.id).catch(() => { m.roles.cache.forEach(x => x.edit({permissions : []},`${client.user.username.toUpperCase()} SECURE MODE | ANTI BAN`)) })) 
            }
        } catch(e) { member.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MOD | ANTI BAN | CAN'T QUARANTINE`})}
        }
        if(set == `beast`)
        {
            return member.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} BEAST MODE | ANTI BAN`})
        }
    });
    client.on('guildMemberRemove',async member => {
        let logs = await member.guild.fetchAuditLogs({type : `MEMBER_KICK`}).then(x => x.entries.first());
        if(logs){
        if(logs.executor.id === client.user.id) return;
        if(logs.executor.id === member.guild.ownerId) return;

        let set = await client.data2.get(`setup_${member.guild.id}`);
        if(!set || set == null) { await client.data2.set(`setup_${member.guild.id}`,`none`) }
        if(set === `none`) return;

        let wl = await client.data3.get(`whitelist_${member.guild.id}`);
        if(!wl || wl === null) { await client.data3.set(`whitelist_${member.guild.id}`,[]) }
        if(wl.includes(logs.executor.id))return;

        if(set == `secure`)
        {
            try{
            let qRole = await client.data.get(`qrole_${member.guild.id}`);
            if(!qRole || !member.guild.roles.cache.get(qRole)) { await client.data2.set(`setup_${member.guild.id}`,`beast`); return member.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI KICK | QUARANTINE ROLE NOT FOUND`}) }
            else{
                let roles = [];
                let m = member.guild.members.cache.get(logs.executor.id);
                m.roles.cache.filter(x => x.id !== member.guild.roles.everyone.id).forEach(x => roles.push(x.id));
                client.data.set(`roles_${m.id}`,roles);
                m.roles.add(qRole,`${client.user.username.toUpperCase()} SECURE MODE | ANTI KICK`) 
                m.roles.cache.filter(x => x.id !== member.guild.roles.everyone.id).forEach(r => m.roles.remove(r.id).catch(() => { m.roles.cache.forEach(x => x.edit({permissions : []},`${client.user.username.toUpperCase()} SECURE MODE | ANTI KICK`)) })) 
            }
        } catch(e) { member.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI KICK | CAN'T QUARANTINE`})}
        }
        if(set == `beast`)
        {
            return member.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} BEAST MODE | ANTI KICK`})
        } }
    });
    client.on('guildBanRemove',async member => {
        let logs = await member.guild.fetchAuditLogs({type : `MEMBER_BAN_REMOVE`}).then(x => x.entries.first());
        if(!logs) return;
        if(logs.executor.id == client.user.id) return;
        if(logs.executor.id == member.guild.ownerId) return;

        let set = await client.data2.get(`setup_${member.guild.id}`);
        if(!set || set == null) { await client.data2.set(`setup_${member.guild.id}`,`none`) }
        if(set == `none`) return;

        let wl = await client.data3.get(`whitelist_${member.guild.id}`);
        if(!wl || wl == null) { await client.data3.set(`whitelist_${member.guild.id}`,[]) }
        if(wl.includes(logs.executor.id))return;

        member.guild.members.ban(logs.target.id,`${client.user.username.toUpperCase()} AUTO RECOVERY | ANTI UNBAN`);

        if(set == `secure`)
        {
            try{
            let qRole = await client.data.get(`qrole_${member.guild.id}`);
            if(!qRole || !member.guild.roles.cache.get(qRole)) { await client.data2.set(`setup_${member.guild.id}`,`beast`); return member.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI UNBAN | QUARANTINE ROLE NOT FOUND`}) }
            else{
                let roles = [];
                let m = member.guild.members.cache.get(logs.executor.id);
                m.roles.cache.filter(x => x.id !== member.guild.roles.everyone.id).forEach(x => roles.push(x.id));
                client.data.set(`roles_${m.id}`,roles);
               try{ m.roles.add(qRole,`${client.user.username.toUpperCase()} SECURE MODE | ANTI UNBAN`) } catch(e) { }
                m.roles.cache.filter(x => x.id !== member.guild.roles.everyone.id).forEach(r => m.roles.remove(r.id).catch(() => { m.roles.cache.forEach(x => x.edit({permissions : []},`${client.user.username.toUpperCase()} SECURE MODE | ANTI UNBAN`)) })) 
            }
        } catch(e) { member.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI UNBAN | CAN'T QUARANTINE`}).catch(() => {}) }
        }
        if(set == `beast`)
        {
            return member.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} BEAST MODE | ANTI UNBAN`})
        }
    });
}