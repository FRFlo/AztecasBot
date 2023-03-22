import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, SlashCommandBuilder, TextChannel } from "discord.js";
import { client, config, log } from "..";
import { Embed } from "../classes/embed";
import { AZCommand } from "../classes/files";

module.exports = <AZCommand>{
    data: new SlashCommandBuilder()
        .setName("radio")
        .setDescription("Régénérer la radio"),
    async execute(interaction: ChatInputCommandInteraction) {
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

        await interaction.reply({ content: "Radio changée" })
    },
};