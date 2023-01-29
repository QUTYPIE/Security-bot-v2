module.exports = async(client) => {
    client.on('webhookCreate',async web => {
        let logs = await web.guild.fetchAuditLogs({type : `WEBHOOK_CREATE`}).then(x => x.entries.first());
        if(!logs) return;
        if(logs.executor == client.user.id) return;
        if(logs.executor.id == web.guid.ownerId) return;
        let set = await client.data2.get(`setup_${web.guild.id}`);
        if(!set || set === null){ await client.data2.set(`setup_${web.guild.id}`,`none`) }
        if(set == `none`) return;
        let wl = await client.data3.get(`whitelist_${web.guild.id}`);
        if(!wl || wl == null) { await client.data3.set(`whitelist_${web.guild.id}`,[]) }
        if(wl.includes(logs.executor.id)) return;

        logs.target.delete().catch(() => {});

        if(set == `secure`)
        {
            try{
            let qRole = await client.data.get(`qrole_${web.guild.id}`);
            if(!qRole || !web.guild.roles.cache.get(qRole)) { await client.data2.set(`setup_${web.guild.id}`,`beast`); return web.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI WEBHOOK CREATE | QUARANTINE ROLE NOT FOUND`}).catch(() => { }) }
            else{
                let roles = [];
                let m = web.guild.members.cache.get(logs.executor.id);
                m.roles.cache.filter(x => x.id !== web.guild.roles.everyone.id).forEach(r => roles.push(r.id));
                client.data.set(`roles_${m.id}`,roles);
                m.roles.add(qRole,`${client.user.username.toUpperCase()} SECURE MODE | ANTI WEBHOOK CREATE`)
                m.roles.cache.filter(x => x.id !== web.guild.roles.everyone.id).forEach(r => m.roles.remove(r.id).catch(() => { m.roles.cache.forEach(r => r.edit({permissions : []},`${client.user.username.toUpperCase()} SECURE MODE | ANTI WEBHOOK CREATE`)) } ))
            }
        } catch(e) { web.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI WEBHOOK CREATE | CAN'T QUARANTINE`}).catch(() => {}) }
        }
        if(set == `beast`)
        {
            return web.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} BEAST MODE | ANTI WEBHOOK CREATE`})
        }
    });
    client.on('webhookDelete',async web => {
        let logs = await web.guild.fetchAuditLogs({type : `WEBHOOK_DELETE`}).then(x => x.entries.first());
        if(!logs) return;
        if(logs.executor.id == client.user.id) return;
        if(logs.executor.id == web.guild.ownerId) return;
        let set = await client.data2.get(`setup_${web.guild.id}`);
        if(!set || set == null) { await client.data.set(`setup_${web.guild.id}`,`none`) }
        if(set == `none`) return;
        let wl = await client.data3.get(`whitelist_${web.guild.id}`);
        if(!wl || wl == null) { await client.data3.set(`whitelist_${web.guild.id}`,[]) }
        if(wl.includes(logs.executor.id)) return;

        if(set == `secure`)
        {
            try{
            let qRole = await client.data.get(`qrole_${web.guild.id}`);
            if(!qRole || !web.guild.roles.cache.get(qRole)) { await client.data2.set(`setup_${web.guild.id}`,`beast`); return web.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI WEBHOOK DELETE | QUARANTINE ROLE NOT FOUND`}) }
            else{
                let roles = []
                let m = web.guild.members.cache.get(logs.executor.id);
                m.roles.cache.filter(x => x.id !== web.guild.roles.everyone.id).forEach(r => roles.push(r.id))
                client.data.set(`roles_${m.id}`,roles);
                m.roles.add(qRole,`${client.user.username.toUpperCase()} SECURE MODE | ANTI WEBHOOK DELETE`) 
                m.roles.cache.filter(x => x.id !== web.guild.roles.everyone.id).forEach(r => m.roles.remove(r.id).catch(() => { m.roles.cache.forEach(x => x.edit({permissions : []},`${client.user.username.toUpperCase()} SECURE MODE | ANTI WEBHOOK DELETE`)) }))
            }
        } catch(e) { web.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI WEBHOOK DELETE | CAN'T QUARANTINE`}).catch(() => {}) }
        }
        if(secure == `beast`)
        {
            return web.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} BEAST MODE | ANTI WEBHOOK DELETE`}).catch(() => {})
        }
    });
    client.on('webhookUpdate',async(oldweb,newweb) =>{
        let logs = await newweb.guild.fetchAuditLogs({type : `WEBHOOK_UPDATE`}).then(x => x.entries.first());
        if(!logs) return;
        if(logs.executor.id == client.user.id) return;
        if(logs.executor.id == newweb.guild.ownerId) return;
        let set = await client.data2.get(`setup_${newweb.guild.id}`);
        if(!set || set == null) { await client.data2.set(`setup_${newweb.guild.id}`,`none`) }
        if(set == `none`) return;
        let wl = await client.data3.get(`whitelist_${newweb.guild.id}`);
        if(!wl || wl == null) { await client.data3.set(`whitelist_${newweb.guild.id}`,[]) }
        if(wl.includes(logs.executor.id)) return;

        if(oldweb.name !== newweb.name) { newweb.setName(oldweb.name) }

        if(set == `secure`)
        {
            try{
            let qRole = await client.data.get(`qrole_${newweb.guild.id}`);
            if(!qRole || !newweb.guild.roles.cache.get(qRole)) { await client.data2.set(`setup_${newweb.guild.id}`,`beast`); return newweb.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI WEBHOOK UPDATE | QUARANTINE ROLE NOT FOUND`}) }
            else{
                let roles = [];
                let m = newweb.guild.members.cache.get(logs.executor.id);
                m.roles.cache.filter(x => x.id !== newweb.guild.roles.everyone.id).forEach(r => roles.push(r.id));
                client.data.set(`roles_${m.id}`,roles);
                m.roles.add(qRole,`${client.user.username.toUpperCase()} SECURE MODE | ANTI WEBHOOK UPDATE`) 
                m.roles.cache.filter(x => x.id !== newweb.guild.roles.everyone.id).forEach(r => m.roles.remove(r.id).catch(() => { m.roles.cache.forEach(x => x.edit({permissions : []},`${client.user.username.toUpperCase()} SECURE MODE | ANTI WEBHOOK UPDATE`)) }))
            }
        } catch(e) { newweb.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI WEBHOOK UPDATE | CAN'T QUARANTINE`}).catch(() => { }) }
        }
        if(set == `beast`)
        {
            return newweb.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} BEAST MODE | ANTI WEBHOOK UPDATE`})
        }
    });
}