module.exports = async(client) => {
    client.on("ready",async() => {
        client.user.setPresence({
            activities : [{
                name : `${client.config.prefix}help`,
                type : "WATCHING"
            }],
            status : "online"
        });
    });
};