import { ButtonInteraction } from "discord.js";
import { AZButton } from "../classes/files";
import { EmbedResponseSuccess } from "../classes/embed";

module.exports = <AZButton>{
    name: "radio",
    async execute(interaction: ButtonInteraction) {
        await interaction.deferReply();

        const embed = interaction.message.embeds[0]
        embed.fields[0].value = String(Math.floor(Math.random() * (100000 - 100 + 1) + 100))

        await interaction.message.edit({ embeds: [embed] })

        await interaction.editReply({
            content: "@here",
            embeds: [
                new EmbedResponseSuccess(interaction.user)
                    .setDescription("Radio changée")
                    .setDescription("La radio a été régénérée avec succès")
            ]
        })
    },
};