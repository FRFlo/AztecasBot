import { ActionRowBuilder, ActivityType, ButtonBuilder, ButtonStyle, Client, TextChannel } from "discord.js";
import * as cron from "node-cron";
import { config, log } from "..";
import { AZEvent } from "../classes/files";
import { Embed } from "../classes/embed";

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

        cron.schedule("0 17 * * *", (date: Date) => {
            log(`Radio changée à ${date.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}`)

            for (const channelId in config.radios) {
                const channel = client.channels.cache.get(config.radios[channelId]) as TextChannel;

                if (!channel) {
                    log(`Impossible de trouver le channel ${config.radios[channelId]}`);
                    continue;
                }

                channel.send({
                    content: "@here",
                    embeds: [
                        new Embed()
                            .setTitle("Radio")
                            .setDescription(`Holà todos, une nouvelle radio est disponible !\n\nPour rappel:\nIl est obligatoire de se brancher en radio en arrivant en ville. Ne pas être branché à celle çi peut vous attirer des sanctions`)
                            .addFields([
                                { name: "Radio actuelle", value: String(Math.floor(Math.random() * (100000 - 100 + 1) + 100)) },
                            ])
                    ], components: [
                        new ActionRowBuilder<ButtonBuilder>()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId("radio")
                                    .setLabel("Régénérer la radio")
                                    .setStyle(ButtonStyle.Danger)
                            )
                    ]
                })
            }
        })
    },
};