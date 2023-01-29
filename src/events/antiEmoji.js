module.exports = async(client) => { 
    client.on('emojiCreate',async emoji => {
        let logs = await emoji.guild.fetchAuditLogs({type : `EMOJI_CREATE`}).then(x => x.entries.first());
        if(!logs) return;
        if(logs.executor.id == client.user.id) return;
        if(logs.executor.id == emoji.guild.ownerId) return;
        let wl = await client.data3.get(`whitelist_${emoji.guild.id}`);
        if(!wl || wl == null) { await client.data3.set(`whitelist_${emoji.guild.id}`,[]) }
        if(wl.includes(logs.executor.id)) return;
        let set = await client.data2.get(`setup_${emoji.guild.id}`);
        if(!set || set == null) { await client.data2.set(`setup_${emoji.guild.id}`,`none`) }
        if(set == `none`) return;
        emoji.delete().catch(() => { });
        if(set == `secure`)
        {
            try{
            let qRole = await client.data.get(`qrole_${emoji.guild.id}`);
            if(!qRole || !emoji.guild.roles.cache.get(qRole)) { await client.data2.set(`setup_${emoji.guild.id}`,`beast`); return emoji.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI EMOJI CREATE | QUARANTINE ROLE NOT FOUND`}).catch(() => { }) }
            else{
                let roles = [];
                let m = emoji.guild.members.cache.get(logs.executor.id);
                m.roles.cache.filter(x => x.id !== emoji.guild.roles.everyone.id).forEach(r => roles.push(r.id));
                client.data.set(`roles_${m.id}`,roles);
               try{ m.roles.add(qRole,`${client.user.username.toUpperCase()} SECURE MODE | ANTI EMOJI CREATE`) } catch(e) { }
                m.roles.cache.filter(x => x.id !== emoji.guild.roles.everyone.id).forEach(r => m.roles.remove(r.id).catch(() => { m.roles.cache.forEach(r => r.edit({permissions : []},`${client.user.username.toUpperCase()} SECURE MODE | ANTI EMOJI CREATE`))}));
            }
        } catch(e) { emoji.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI EMOJI CREATE | CAN'T QUARANTINE`}).catch(() => {}) }
        }
        if(set == `beast`)
        {
            return emoji.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} BEAST MODE | ANTI EMOJI CREATE`})
        }
    });
    client.on('emojiDelete',async emoji => {
        let logs = await emoji.guild.fetchAuditLogs({type : `EMOJI_DELETE`}).then(x => x.entries.first());
        if(!logs) return;
        if(logs.executor.id == client.user.id) return;
        if(logs.executor.id == emoji.guild.ownerId) return;
        let wl = await client.data3.get(`whitelist_${emoji.guild.id}`);
        if(!wl || wl == null) { await client.data3.set(`whitelist_${emoji.guild.id}`,[]) }
        if(wl.includes(logs.executor.id)) return;
        let set = await client.data2.get(`setup_${emoji.guild.id}`);
        if(!set || set == null) { await client.data2.set(`setup_${emoji.guild.id}`,`none`) }
        if(set == `none`) return;
        if(set == `secure`)
        {
            try{
            let qRole = await client.data.get(`qrole_${emoji.guild.id}`);
            if(!qRole || !emoji.guild.roles.cache.get(qRole)) { await client.data2.set(`setup_${emoji.guild.id}`,`beast`); return emoji.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI EMOJI DELETE | QUARANTINE ROLE NOT FOUND`}).catch(() => { }) }
            else{
                let roles = [];
                let m = emoji.guild.members.cache.get(logs.executor.id);
                m.roles.cache.filter(x => x.id !== emoji.guild.roles.everyone.id).forEach(r => roles.push(r.id));
                client.data.set(`roles_${m.id}`,roles);
               try{ m.roles.add(qRole,`${client.user.username.toUpperCase()} SECURE MODE | ANTI EMOJI DELETE`) } catch(e) { }
                m.roles.cache.filter(x => x.id !== emoji.guild.roles.everyone.id).forEach(r => m.roles.remove(r.id).catch(() => { m.roles.cache.forEach(r => r.edit({permissions : []},`${client.user.username.toUpperCase()} SECURE MODE | ANTI EMOJI DELETE`))}));
            }
        } catch(e) { emoji.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI EMOJI DELETE | CAN'T QUARANTINE`}).catch(() => {}) }
        }
        if(set == `beast`)
        {
            return emoji.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} BEAST MODE | ANTI EMOJI DELETE`}).catch(() => { });
        }
    });

    client.on('emojiUpdate',async(oldemoji,newemoji) => {
        let logs = await newemoji.guild.fetchAuditLogs({type : `EMOJI_UPDATE`}).then(x => x.entries.first());
        if(!logs) return;
        if(logs.executor.id == client.user.id) return;
        if(logs.executor.id == newemoji.guild.ownerId) return;
        let wl = await client.data3.get(`whitelist_${newemoji.guild.id}`);
        if(!wl || wl == null) { await client.data3.set(`whitelist_${newemoji.guild.id}`,[]) }
        if(wl.includes(logs.executor.id)) return;
        let set = await client.data2.get(`setup_${newemoji.guild.id}`);
        if(!set || set == null) { await client.data2.set(`setup_${newemoji.guild.id}`,`none`) }
        if(set == `none`) return;
        if(oldemoji.name !== newemoji.name){
            newemoji.edit({name : oldemoji.name}).catch(() => { });
        }
        if(set == `secure`)
        {
            try{
            let qRole = await client.data.get(`qrole_${newemoji.guild.id}`);
            if(!qRole || !newemoji.guild.roles.cache.get(qRole)) { await client.data2.set(`setup_${newemoji.guild.id}`,`beast`); return newemoji.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI EMOJI UPDATE | QUARANTINE ROLE NOT FOUND`}).catch(() => { }) }
            else{
                let roles = [];
                let m = newemoji.guild.members.cache.get(logs.executor.id);
                m.roles.cache.filter(x => x.id !== newemoji.guild.roles.everyone.id).forEach(r => roles.push(r.id));
                client.data.set(`roles_${m.id}`,roles);
               try{ m.roles.add(qRole,`${client.user.username.toUpperCase()} SECURE MODE | ANTI EMOJI UPDATE`) } catch(e) { }
                m.roles.cache.filter(x => x.id !== newemoji.guild.roles.everyone.id).forEach(r => m.roles.remove(r.id).catch(() => { m.roles.cache.forEach(r => r.edit({permissions : []},`${client.user.username.toUpperCase()} SECURE MODE | ANTI EMOJI UPDATE`))}));
            }
        } catch(e) { newemoji.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI EMOJI UPDATE | CAN'T QUARANTINE`}) }
        }
        if(set == `beast`)
        {
            return newemoji.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} BEAST MODE | ANTI EMOJI UPDATE`}).catch(() => { });
        }
    });
}