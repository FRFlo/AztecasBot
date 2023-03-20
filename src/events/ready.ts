import { ActivityType, Client } from "discord.js";
import { log } from "..";
import { AZEvent } from "../classes/files";

module.exports = <AZEvent>{
    name: 'ready',
    once: true,
    async execute(client: Client) {
        log(`${client.user.tag} ready !`)

        client.user.setPresence({
            status: "online",
            activities: [
                {
                    name: "los Aztecas",
                    type: ActivityType.Watching
                }
            ]
        });
    },
};