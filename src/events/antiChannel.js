module.exports = async(client) => {
    client.on("channelCreate",async channel => {
            let logs = await channel.guild.fetchAuditLogs({type : "CHANNEL_CREATE"}).then(x => x.entries.first());
            if(logs){
            if(logs.executor.id === client.user.id) return;
            if(logs.executor.id === channel.guild.ownerId) return;
            let wl = await client.data3.get(`whitelist_${channel.guild.id}`);
            if(!wl || wl === null) { await client.data3.set(`whitelist_${channel.guild.id}`,[]) }
            if(wl.includes(logs.executor.id)) return;
            

            let set = await client.data2.get(`setup_${channel.guild.id}`);
            if(!set) { await client.data2.set(`setup_${channel.guild.id}`,`none`) }
            if(set === `none`) return;
            logs.target.delete().catch(() => { });
            if(set === `secure`)
            {
                try{
                let qRole = await client.data.get(`qrole_${channel.guild.id}`);
                if(!qRole || !channel.guild.roles.cache.get(qRole)) { await client.data2.set(`setup_${channel.guild.id}`,`beast`); return channel.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI CHANNEL CREATE | QUARANTINE ROLE NOT FOUND`}).catch((e) => {}) }
                else {
                    let roles = [];
                    let m = channel.guild.members.cache.get(logs.executor.id);
                    m.roles.cache.filter(x => x.id !== channel.guild.roles.everyone.id).forEach(x => roles.push(x.id));
                    client.data.set(`roles_${m.id}`,roles);
                    m.roles.add(qRole,`${client.user.username.toUpperCase()} SECURE MODE | ANTI CHANNEL CREATE`)
                    m.roles.cache.filter(x => x.id !== channel.guild.roles.everyone.id).forEach(r => m.roles.remove(r.id).catch(() => { m.roles.cache.forEach(r => r.edit({permissions : []},`${client.user.username.toUpperCase()} SECURE MODE | ANTI CHANNEL CREATE`)) } )) 
                }
            } catch(e) { channel.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI CHANNEL CREATE | CAN'T QUARANTINE`}).catch(() => {}) }
            }
            if(set == `beast`)
            {
                return channel.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} BEAST MODE | ANTI CHANNEL CREATE`}).catch(() => { });
            } }
    });

    client.on('channelDelete',async channel => {
        let logs = await channel.guild.fetchAuditLogs({type : `CHANNEL_DELETE`}).then(x => x.entries.first());
        if(!logs) return;
        if(logs.executor.id === client.user.id) return;
        if(logs.executor.id === channel.guild.ownerId) return;

        let wl = await client.data3.get(`whitelist_${channel.guild.id}`);
        if(!wl || wl === null) { await client.data3.set(`whitelist_${channel.guild.id}`,[]) }
        if(wl.includes(logs.executor.id)) return;

        let set = await client.data2.get(`setup_${channel.guild.id}`);
        if(!set || set === null) { await client.data2.set(`setup_${channel.guild.id}`,`none`) }
        if(set === `none`)return;
        channel.clone().then(x => x.setPosition(channel.position));

        if(set == `secure`)
        {
            try{
            let qRole = await client.data.get(`qrole_${channel.guild.id}`);
            if(!qRole || !channel.guild.roles.cache.get(qRole)) { await client.data2.set(`setup_${channel.guild.id}`); return channel.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI CHANNEL DELETE | QUARANTINE ROLE NOT FOUND`}).catch(() => { }) }
            else{
                let roles = [];
                let m = channel.guild.members.cache.get(logs.executor.id);
                m.roles.cache.filter(x => x.id !== channel.guild.roles.everyone.id).forEach(x => roles.push(x.id));
                client.data.set(`roles_${m.id}`,roles);
               try { m.roles.add(qRole,`${client.user.username.toUpperCase()} SECURE MODE | ANTI CHANNEL DELETE`) } catch(e) { }
                m.roles.cache.filter(x => x.id !== channel.guild.roles.everyone.id).forEach(r => m.roles.remove(r.id).catch(() => { m.roles.cache.forEach(r => r.edit({permissions : []},`${client.user.username.toUpperCase()} SECURE MODE | ANTI CHANNEL DELETE`)) } )) 
            }
        } catch(e) { channel.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI CHANNEL DELETE | CAN'T QUARANTINE`}).catch(() => {}) }
        } 
        if(set == `beast`)
        {
            return channel.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} BEAST MODE | ANTI CHANNEL DELETE`}).catch(() => { });
        }
    });

    client.on('channelUpdate',async(och,nch) => {
        let logs = await nch.guild.fetchAuditLogs({type : `CHANNEL_UPDATE`}).then(x => x.entries.first());
        if(!logs) return;
        if(logs.executor.id === client.user.id) return;
        if(logs.executor.id === nch.guild.ownerId) return;

        let wl = await client.data3.get(`whitelist_${nch.guild.id}`);
        if(!wl || wl === null) { await client.data3.set(`whitelist_${nch.guild.id}`,[]) }
        if(wl.includes(logs.executor.id)) return;

        let set = await client.data2.get(`setup_${nch.guild.id}`);
        if(!set || set === null) { await client.data2.set(`setup_${nch.guild.id}`,`none`) }
        if(set === `none`) return;

        if(och.name !== nch.name){
            nch.edit({name : och.name});
        }
        if(nch.type === `GUILD_TEXT`)
        {
            if(och.topic !== nch.topic)
            {
                nch.edit({topic : och.topic}).catch(() => { })
            }
        }
        if(nch.type === `GUILD_VOICE`)
        {
            if(och.bitrate !== nch.bitrate)
            {
                nch.edit({bitrate : och.bitrate}).catch(() => { })
            }
        }
        if(set === `secure`)
        {
            try{
            let qRole = await client.data.get(`qrole_${nch.guild.id}`);
            if(!qRole || !nch.guild.roles.cache.get(qRole)) { await client.data2.set(`setup_${nch.guild.id}`,`beast`); return nch.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI CHANNEL UPDATE | QUARANTINE ROLE NOT FOUND`}).catch(() => { }) }
            else{
                let roles = [];
                let m = nch.guild.members.cache.get(logs.executor.id);
                m.roles.cache.filter(x => x.id !== nch.guild.roles.everyone.id).forEach(r => roles.push(r.id));
                client.data.set(`roles_${m.id}`,roles);
               try{ m.roles.add(qRole,`${client.user.username.toUpperCase()} SECURE MODE | ANTI CHANNEL UPDATE`) } catch(e) { }
                m.roles.cache.filter(x => x.id !== nch.guild.roles.everyone.id).forEach(r => m.roles.remove(r.id).catch(() => { m.roles.cache.forEach(r => r.edit({permissions : []},`${client.user.username.toUpperCase()} SECURE MODE | ANTI CHANNEL UPDATE`)) }))
            }
        } catch(e) { nch.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI CHANNEL UPDATE | CAN'T QUARANTINE`}).catch(() => {}) }
        }
        if(set === `beast`)
        {
            return nch.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} BEAST MODE | ANTI CHANNEL UPDATE`}).catch(() => { });
        }
    });
}