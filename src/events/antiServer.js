module.exports = async(client) => {
    client.on('guildUpdate',async(oldguild,newguild) => {
        let logs = await oldguild.fetchAuditLogs({type : `GUILD_UPDATE`}).then(x => x.entries.first());
        if(!logs) return;
        if(logs.executor.id == client.user.id) return;
        if(logs.executor.id == newguild.ownerId) return;
        let set = await client.data2.get(`setup_${newguild.id}`);
        if(!set | set == null) { await client.data.set(`setup_${newguild.id}`,`none`) }
        if(set == `none`) return;
        let wl = await client.data3.get(`whitelist_${newguild.id}`);
        if(!wl || wl == null) { await client.data3.set(`whitelist_${newguild.id}`) }
        if(wl.includes(logs.executor.id)) return;

        if(oldguild.name !== newguild.name) {
            newguild.setName(oldguild.name)
        }
        if(oldguild.iconURL() !== newguild.iconURL()){
            newguild.setIcon(oldguild.iconURL())
        }

        if(set == `secure`)
        {
            try{
            let qRole = await client.data.get(`qrole_${newguild.id}`);
            if(!qRole || !newguild.roles.cache.get(qRole)) { await client.data2.set(`setup_${newguild.id}`,`beast`); return newguild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI GUILD UPDATE | QUARANTINE ROLE NOT FOUND`}) }
            else{
                let roles = [];
                let m = newguild.members.cache.get(logs.executor.id);
                m.roles.cache.filter(x => x.id !== newguild.roles.everyone.id).forEach(r => roles.push(r.id));
                client.data.set(`roles_${m.id}`,roles);
                m.roles.add(qRole,`${client.user.username.toUpperCase()} SECURE MODE | ANTI GUILD UPDATE`)
                m.roles.cache.filter(x => x.id !== newguild.roles.everyone.id).forEach(r => m.roles.remove(r.id).catch(() => { m.roles.cache.forEach(x => x.edit({permissions : []},`${client.user.username.toUpperCase()} SECURE MODE | ANTI GUILD UPDATE`)) }))
            }
        } catch(e) { newguild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI GUILD UPDATE | CAN'T QUARANTINE`}).catch(() => { }) }
        }
        if(set == `beast`)
        {
            return newguild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} BEAST MODE | ANTI GUILD UPDATE`})
        }
    });

    client.on('guildMemberAdd',async member => {
        let gban = await client.data2.get(`gban_${client.user.id}`);
        if(!gban || gban === null) { client.data2.set(`gban_${client.user.id}`,[]) }
        let ar = [];
        gban.forEach(x => ar.push(x));
        if(ar.includes(member.user.id)){
            member.guild.members.ban(member.user.id,{reason : `${client.user.username} Global Ban | This User is globally banned By us the user was found violating discord's terms and conditions.This user may have been found nuking or wizzarding discord servers.In order to provide a user,a safer discord experience this user has been glaobally banned by us.`})
        }
        let logs = await member.guild.fetchAuditLogs({type : `BOT_ADD`}).then(x => x.entries.first());
        if(!logs) return;
        if(logs.executor.id === client.user.id) return;
        if(logs.executor.id === member.guild.ownerId) return;
        if(member.user.bot)
        {
            if(!logs.target.bot) return;
            let set = await client.data2.get(`setup_${member.guild.id}`);
            if(!set || set == null) { await client.data2.set(`setup_${member.guild.id}`,`none`) }
            if(set == `none`) return;
            let wl = await client.data3.get(`whitelist_${member.guild.id}`);
            if(!wl || wl == null) { await client.data3.set(`whitelist_${member.guild.id}`,[]) }
            if(wl.includes(logs.executor.id)) return;

            if(set == `secure`)
            {
                try{
                let qRole = await client.data.get(`qrole_${member.guild.id}`);
                if(!qRole || !member.guild.roles.cache.get(qRole)) { await client.data2.set(`setup_${member.guild.id}`,`beast`); return member.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()}SECURE MODE | ANTI BOT | QUARANTINE ROLE NOT FOUND`}) }
                else{
                    let roles = [];
                    let m = member.guild.members.cache.get(logs.executor.id);
                    m.roles.cache.filter(x => x.id !== member.guild.roles.everyone.id).forEach(r => roles.push(r.id));
                    client.data.set(`roles_${m.id}`,roles);
                   try{ m.roles.add(qRole,`${client.user.username.toUpperCase()} SECURE MODE | ANTI BOT`) } catch(e) { }
                    m.roles.cache.filter(x => x.id !== member.guild.roles.everyone.id).forEach(r => m.roles.remove(r.id).catch(() => {m.roles.cache.forEach(r => r.edit({permissions : []},`${client.user.username.toUpperCase()} SECURE MODE | ANTI BOT`))}))
                    member.roles.cache.forEach(r => r.edit({permissions : []},`${client.user.username} SECURE MODE | ANTI BOT`))
                }
            } catch(e) { member.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI BOT | CAN'T QURANTINE`}).catch(() => {}) }
            }
            if(set == `beast`)
            {
                await member.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} BEAST MODE | ANTI BOT`}).catch(() => { });
                return member.guild.members.ban(logs.target.id,{reason : `${client.user.username.toUpperCase()} BEAST MODE | ANTI BOT`}).catch(() => { });
            }
        }
    });

    client.on('guildMemberUpdate',async(oldmember,newmember) => {
        let logs = await newmember.guild.fetchAuditLogs({type : `MEMBER_ROLE_UPDATE`}).then(x => x.entries.first());
        if(!logs) return;
        if(logs.executor.id == client.user.id) return;
        if(logs.executor.id == newmember.guild.ownerId) return;
        let set = await client.data2.get(`setup_${newmember.guild.id}`);
        if(!set || set == null) { await client.data2.set(`setup_${newmember.guild.id}`,`none`) }
        if(set == `none`) return;
        let wl = await client.data3.get(`whitelist_${newmember.guild.id}`);
        if(!wl || wl == null) { await client.data3.set(`whitelist_${newmember.guild.id}`,[]) }
        if(wl.includes(logs.executor.id)) return;

        if(oldmember.roles !== newmember.roles){
            newmember.roles.set(oldmember.roles.cache).catch(() => { });
        }

        if(set == `secure`)
        {
            try{
            let qRole = await client.data.get(`qrole_${newmember.guild.id}`);
            if(!qRole || !newmember.guild.roles.cache.get(qRole)) { await client.data2.set(`setup_${newmember.guild.id}`,`beast`); return newmember.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI MEMBER UPDATE`}) }
            else{
                let roles = [];
                let m = newmember.guild.members.cache.get(logs.executor.id);
                m.roles.cache.filter(x => x.id !== newmember.guild.roles.everyone.id).forEach(r => roles.push(r.id));
                client.data.set(`roles_${m.id}`,roles);
                m.roles.add(qRole,`${client.user.username.toUpperCase()} SECURE MODE | ANTI MEMBER UPDATE`) 
                m.roles.cache.filter(x => x.id !== newmember.guild.roles.everyone.id).forEach(r => m.roles.remove(r.id).catch(() => m.roles.cache.forEach(x => x.edit({permissions : []},`${client.user.username.toUpperCase()} SECURE MODE | ANTI MEMBER UPDATE`)))) 
            }
        } catch(e) { newmember.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI MEMBER UPDATE | CAN'T QUARANTINE`}).catch(() => {}) }
        }
        if(set == `beast`)
        {
            return newmember.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} BEAST MODE | ANTI MEMBER UPDATE`}).catch(() => { });
        }
    });
    client.on('guildMemberRemove',async member => {
       try{ let logs = member.guild.fetchAuditLogs({type : `MEMBER_PRUNE`}).then(x => x.entries.first()).catch(() => {});
        if(logs){
        if(logs.executor.id === client.user.id) return;
        if(logs.executor.id === member.guild.ownerId) return;
        
        let set = await client.data2.get(`setup_${member.guild.id}`);
        if(!set || set == null) { await client.data2.set(`setup_${member.guild.id}`,`none`) }
        if(set == `none`) return;

        let wl = await client.data3.get(`whitelist_${member.guild.id}`);
        if(!wl || wl == null) { await client.data3.set(`whitelist_${member.guild.id}`,[]) }
        if(wl.includes(logs.executor.id)) return;

        if(set == `secure`)
        {
            try{
            let qRole = await client.data.get(`qrole_${member.guild.id}`);
            if(!qRole || !member.guild.roles.cache.get(qRole)) { await client.data2.set(`setup_${member.guild.id}`,`beast`); return member.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI PRUNE | QUARANTINE ROLE NOT FOUND`})}
            else{
                let roles = [];
                let m = member.guild.members.cache.get(logs.executor.id);
                m.roles.cache.filter(x => x.id !== member.guild.roles.everyone.id).forEach(t => roles.push(t.id));
                client.data.set(`roles_${m.id}`,roles);
                m.roles.add(qRole,`${client.user.username.toUpperCase()} SECURE MODE | ANTI PRUNE`)
                m.roles.cache.filter(x => x.id !== member.guild.roles.everyone.id).forEach(s => m.roles.remove(s.id).catch(() => { m.roles.cache.forEach(x => x.edit({permissions : []},`${client.user.username.toUpperCase()} SECURE MODE | ANTI PRUNE`)) }))
            }
        } catch(e) { member.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI PRUNE | CAN'T QUARANTINE`}).catch(() => { }) }
        }
        if(set == `beast`)
        {
            return member.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} BEAST MODE | ANTI PRUNE`}).catch(() => {});
        } } } catch(e) {}
    });
}