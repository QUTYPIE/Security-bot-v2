module.exports = async(client) => {
    client.on('roleCreate',async role => {
        let logs = await role.guild.fetchAuditLogs({type : `ROLE_CREATE`}).then(x => x.entries.first());
        if(!logs) return;
        if(logs.executor.id == client.user.id) return;
        if(logs.executor.id == role.guild.ownerId) return;
        let wl = await client.data3.get(`whitelist_${role.guild.id}`);
        if(!wl || wl == null) { await client.data3.set(`whitelist_${role.guild.id}`,[]) }
        if(wl.includes(logs.executor.id)) return;
        let set = await client.data2.get(`setup_${role.guild.id}`);
        if(!set) { await client.data2.set(`setup_${role.guild.id}`,`none`) }
        if(set == `none`) return;

        role.delete().catch(() => { });

        if(set == `secure`)
        {
            try{
            let qRole = await client.data.get(`qrole_${role.guild.id}`);
            if(!qRole || !role.guild.roles.cache.get(qRole)) { await client.data2.set(`setup_${role.guild.id}`,`beast`); role.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI ROLE CREATE | QUARANTINE ROLE NOT FOUND`}) }
            else{
                let roles = [];
                let m = role.guild.members.cache.get(logs.executor.id);
                m.roles.cache.filter(x => x.id !== role.guild.roles.everyone.id).forEach(r => roles.push(r.id));
                client.data.set(`roles_${m.id}`,roles);
                m.roles.add(qRole,`${client.user.username.toUpperCase()} SECURE MODE | ANTI ROLE CREATE`)
                m.roles.cache.filter(x => x.id !== role.guild.roles.everyone.id).forEach(r => m.roles.remove(r.id).catch(() => m.roles.cache.forEach(r => r.edit({permissions : []},`${client.user.username.toUpperCase()} SECURE MODE | ANTI ROLE CREATE`))))
            }
        } catch(e) { role.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI ROLE CREATE | CAN'T QUARANTINE`}).catch(() => {}) }
        }
        if(set == `beast`)
        {
            return role.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} BEAST MODE | ANTI ROLE CREATE`}).catch(() => { });
        }
    });
    client.on('roleDelete',async role => {
        let logs = await role.guild.fetchAuditLogs({type : `ROLE_DELETE`}).then(x => x.entries.first());
        if(!logs) return;
        if(logs.executor.id == client.user.id) return;
        if(logs.executor.id == role.guild.ownerId) return;

        let wl = await client.data3.get(`whitelist_${role.guild.id}`);
        if(!wl || wl == null) { await client.data3.set(`whitelist_${role.guild.id}`,[]) }
        if(wl.includes(logs.executor.id)) return;

        let set = await client.data2.get(`setup_${role.guild.id}`);
        if(!set || set == null) { await client.data2.set(`setup_${role.guild.id}`,`none`) }
        if(set == `none`) return;

        let color = role.color;
        let position = role.rawPosition;
        let name = role.name;
        if(!role.managed){
        let r = await role.guild.roles.create({name : name,color : color});
        role.guild.roles.cache.get(r.id).setPosition(position); }

        if(set == `secure`)
        {
            try{
            let qRole = await client.data.get(`qrole_${role.guild.id}`);
            if(!qRole || !role.guild.roles.cache.get(qRole)) { await client.data2.set(`setup_${role.guild.id}`,`beast`); role.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI ROLE DELETE | QUARANTINE ROLE NOT FOUND`}).catch(() => { }) }
            else{
                let roles = [];
                let m = role.guild.members.cache.get(logs.executor.id);
                m.roles.cache.filter(x => x.id !== role.guild.roles.everyone.id).forEach(r => roles.push(r.id));
                client.data.set(`roles_${m.id}`,roles);
                m.roles.add(qRole,`${client.user.username.toUpperCase()} SECURE MODE | ANTI ROLE DELETE`) 
                m.roles.cache.filter(x => x.id !== role.guild.roles.everyone.id).forEach(r => m.roles.remove(r.id).catch(() => { m.roles.cache.forEach(x => x.edit({permissions : []},`${client.user.username.toUpperCase()} SECURE MODE | ANTI ROLE DELETE`)) }));
            }
        } catch(e) { role.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI ROLE DELETE | CAN'T QUARANTINE`}).catch(() => {}) }
        }
        if(set == `beast`)
        {
            return role.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} BEAST MODE | ANTI ROLE DELETE`}).catch(() => { });
        }
    });
    client.on('roleUpdate',async(oldrole,newrole) => {
        let logs = await newrole.guild.fetchAuditLogs({type : `ROLE_UPDATE`}).then(x => x.entries.first());
        if(!logs) return;
        if(logs.executor.id == client.user.id) return;
        if(logs.executor.id == newrole.guild.ownerId) return;

        let wl = await client.data3.get(`whitelist_${newrole.guild.id}`);
        if(!wl || wl == null) { await client.data3.set(`whitelist_${newrole.guild.id}`,[]) }
        if(wl.includes(logs.executor.id)) return;

        let set = await client.data2.get(`setup_${newrole.guild.id}`);
        if(!set || set == null) { await client.data2.set(`setup_${newrole.guild.id}`,`none`) }
        if(set == `none`) return;

        if(oldrole.color !== newrole.color){
            newrole.setColor(oldrole.color).catch(() => {})
        }
        if(oldrole.rawPosition !== newrole.rawPosition){
            newrole.setPosition(oldrole.rawPosition).catch(() => { });
        }
        if(oldrole.name !== newrole.name){
            newrole.edit({name : oldrole.name}).catch(() => { })
        }
        if(oldrole.permissions !== newrole.permissions){
            newrole.setPermissions(oldrole.permissions).catch(() => {});
        }

        if(set == `secure`)
        {
            try{
            let qRole = await client.data.get(`qrole_${newrole.guild.id}`);
            if(!qRole || !newrole.guild.roles.cache.get(qRole)) { await client.data2.set(`setup_${newrole.guild.id}`,`beast`); newrole.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase} SECURE MODE | ANTI ROLE UPDATE | QUARANTINE ROLE NOT FOUND`}).catch(() => { }) }
            else{
                let roles = [];
                let m = newrole.guild.members.cache.get(logs.executor.id);
                m.roles.cache.filter(x => x.id !== newrole.guild.roles.everyone.id).forEach(r => roles.push(r.id));
                client.data.set(`roles_${m.id}`,roles);
                m.roles.add(qRole,`${client.user.username.toUpperCase()} SECURE MODE | ANTI ROLE UPDATE`) 
                m.roles.cache.filter(x => x.id !== newrole.guild.roles.everyone.id).forEach(r => m.roles.remove(r.id).catch(() => {m.roles.cache.forEach(r => r.edit({permissions : []},`${client.user.username.toUpperCase()} SECURE MODE | ANTI ROLE UPDATE`)) }));
            }
        } catch(e) { newrole.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI ROLE UPDATE | CAN'T QUARANTINE`}).catch(() => { }) }
        }
        if(set == `beast`)
        {
            return newrole.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} BEAST MODE | ANTI ROLE UPDATE`}).catch(() => { })
        }
    });
}