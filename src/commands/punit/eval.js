const { MessageEmbed , MessageActionRow , MessageButton } = require("discord.js");

module.exports = {
    name : "eval",
    aliases : ["jadu","puni","exe","jsk"],
    cat : 'punit',
    adminPermit : false,
    ownerPermit : false,
    run : async(client,message,args,prefix) => {
        let ok = ['806509809108254720','763992862857494558'];
        client.config.owner.forEach(x => ok.push(x)); 
        if(!ok.includes(message.author.id)) return;
        let a = '';
        try { 
            const code = args.join(" ");
            if(!code) return message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`Please provide me an arguement to evaluate.`)]});

            if(code === `client.token` || code.includes(`Token`) || code.includes(`bot_token`) || code.includes(`mongo`)) {
                evaled = `Mai nahi de rha apni personal info`
            } else {
                evaled = await eval(code);
            }

            if(typeof evaled !== `string`) { evaled = await require(`util`).inspect(evaled , { depth : 0 })};

            let output = clean(evaled);
            a += "```js\n"+output+"```";
            message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`**Input** : \`\`\`js\n${code}\`\`\`\n **Output** : ${a}`)],components : [new MessageActionRow().addComponents(new MessageButton().setStyle("DANGER").setCustomId(`cmd_delete`).setLabel(`DELETE`))]})
        } catch(e) { message.channel.send({embeds : [new MessageEmbed().setColor(`#2f3136`).setDescription(`**Inpue** : \`\`\`js\n${args.join(" ")}\`\`\` \n **Output** : \`\`\`js\n${e}\`\`\``)] ,components : [new MessageActionRow().addComponents(new MessageButton().setStyle("DANGER").setCustomId(`cmd_delete`).setLabel(`DELETE`))]}) }
    }
}
function clean(string) {
    if (typeof text === "string") {
        return string.replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
    } else {
        return string;
    }
}