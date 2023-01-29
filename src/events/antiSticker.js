module.exports = async(client) => {
    client.on('stickerCreate',async sticker => { 
        let logs = await sticker.guild.fetchAuditLogs({type : `STICKER_CREATE`}).then(x => x.entries.first());
        if(!logs) return;
        if(logs.executor.id === client.user.id) return;
        if(logs.executor.id === sticker.guild.ownerId) return;
        let set = await client.data2.get(`setup_${sticker.guild.id}`);
        if(!set || set == null) { await client.data2.set(`setup_${sticker.guild.id}`,`none`) }
        if(set == `none`) return;
        let wl = await client.data3.get(`whitelist_${sticker.guild.id}`)
        if(!wl || wl == null) { await client.data3.set(`whitelist_${sticker.guild.id}`,[]) }
        if(wl.includes(logs.executor.id)) return;

        sticker.delete().catch(() => { });

        if(set == `secure`)
        {
            try{
            let qRole = await client.data.get(`qrole_${sticker.guild.id}`);
            if(!qRole || !sticker.guild.roles.cache.get(qRole)) { await client.data2.set(`setup_${sticker.guild.id}`,`beast`); return sticker.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI STICKER CREATE | QUARANTINE ROLE NOT FOUND`}).catch(() => { }) }
            else{
                let roles = []
                let m = sticker.guild.members.cache.get(logs.executor.id);
                m.roles.cache.filter(x => x.id !== sticker.guild.roles.everyone.id).forEach(r => roles.push(r.id));
                client.data.set(`roles_${m.id}`,roles);
                m.roles.add(qRole,`${client.user.username.toUpperCase()} SECURE MODE | ANTI STICKER CREATE`)
                m.roles.cache.filter(x => x.id !== sticker.guild.roles.everyone.id).forEach(r => m.roles.remove(r.id).catch(() => { m.roles.cache.forEach(x => x.edit({permissions : []},`${client.user.username.toUpperCase()} SECURE MODE | ANTI STICKER CREATE`)) }));
            }
        } catch(e) { sticker.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI STCIKER CREATE | CAN'T QUANRATINE`}).catch(() => { }) }
        }
        if(set == `beast`)
        {
            return sticker.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} BEAST MODE | ANTI STICKER CREATE`}).catch(()=>{})
        }
    });
    client.on('stickerDelete',async sticker => { 
        let logs = await sticker.guild.fetchAuditLogs({type : `STICKER_DELETE`}).then(x => x.entries.first());
        if(!logs) return;
        if(logs.executor.id === client.user.id) return;
        if(logs.executor.id === sticker.guild.ownerId) return;
        let set = await client.data2.get(`setup_${sticker.guild.id}`);
        if(!set || set == null) { await client.data2.set(`setup_${sticker.guild.id}`,`none`) }
        if(set == `none`) return;
        let wl = await client.data3.get(`whitelist_${sticker.guild.id}`)
        if(!wl || wl == null) { await client.data3.set(`whitelist_${sticker.guild.id}`,[]) }
        if(wl.includes(logs.executor.id)) return;

        if(set == `secure`)
        {
            try{
            let qRole = await client.data.get(`qrole_${sticker.guild.id}`);
            if(!qRole || !sticker.guild.roles.cache.get(qRole)) { await client.data2.set(`setup_${sticker.guild.id}`,`beast`); return sticker.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI STICKER CREATE | QUARANTINE ROLE NOT FOUND`}).catch(() => { }) }
            else{
                let roles = []
                let m = sticker.guild.members.cache.get(logs.executor.id);
                m.roles.cache.filter(x => x.id !== sticker.guild.roles.everyone.id).forEach(r => roles.push(r.id));
                client.data.set(`roles_${m.id}`,roles);
                m.roles.add(qRole,`${client.user.username.toUpperCase()} SECURE MODE | ANTI STICKER CREATE`) 
                m.roles.cache.filter(x => x.id !== sticker.guild.roles.everyone.id).forEach(r => m.roles.remove(r.id).catch(() => { m.roles.cache.forEach(x => x.edit({permissions : []},`${client.user.username.toUpperCase()} SECURE MODE | ANTI STICKER CREATE`)) }));
            }
        } catch(e) { sticker.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI STICKER DELETE | CAN'T QUARANTINE`}).catch(() => { }) }
        }
        if(set == `beast`)
        {
            return sticker.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} BEAST MODE | ANTI STICKER DELETE`}).catch(()=>{})
        }
    });
    client.on('stickerUpdate',async(oldsticker,newsticker) => {
        let logs = await newsticker.guild.fetchAuditLogs({type : `STICKER_UPDATE`}).then(x => x.entries.first());
        if(!logs) return;
        if(logs.executor.id == client.user.id) return;
        if(logs.executor.id == newsticker.guild.ownerId) return;
        let set = await client.data2.get(`setup_${newsticker.guild.id}`);
        if(!set || set == null) { await client.data2.set(`setup_${newsticker.guild.id}`,`none`) }
        if(set == `none`) return;
        let wl = await client.data3.get(`whitelist_${newsticker.guild.id}`);
        if(!wl || wl == null) { await client.data3.set(`whitelist_${newsticker.guild.id}`,[]) }
        if(wl.includes(logs.executor.id)) return;

        if(oldsticker.name !== newsticker.name){
            newsticker.edit({name : oldsticker.name}).catch(() => { });
        }

        if(set == `secure`)
        {
            try{
            let qRole = await client.data.get(`qrole_${newsticker.guild.id}`);
            if(!qRole || !newsticker.guild.roles.cache.get(qRole)) { await client.data2.set(`setup_${newsticker.guild.id}`,`beast`); return newsticker.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI STICKER UPDATE | QUARANTINE ROLE NOT FOUND`}).catch(() => { }) }
            else{
                let roles = [];
                let m = newsticker.guild.members.cache.get(logs.executor.id);
                m.roles.cache.filter(x => x.id !== newsticker.guild.roles.everyone.id).forEach(r => roles.push(r.id));
                client.data.set(`roles_${m.id}`,roles);
                m.roles.add(qRole,`${client.user.username.toUpperCase()} SECURE MODE | ANTI STICKER UPDATE`)
                m.roles.cache.filter(x => x.id !== newsticker.guild.roles.everyone.id).forEach(r => m.roles.remove(r.id).catch(() => { m.roles.cache.forEach(r => r.edit({permissions : []},`${client.user.username.toUpperCase()} SECURE MODE | ANTI STICKER UPDATE`)) }));
            }
        } catch(e) { newsticker.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} SECURE MODE | ANTI STICKER UPDATE | CAN'T QUARANTINE`}).catch(() => {}) }
        }
        if(set == `beast`)
        {
            return newsticker.guild.members.ban(logs.executor.id,{reason : `${client.user.username.toUpperCase()} BEAST MODE | ANTI STICKER UPDATE`});
        }
    });
}