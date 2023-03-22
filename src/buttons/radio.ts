import { ButtonInteraction } from "discord.js";
import { config } from "..";
import { EmbedResponseSuccess } from "../classes/embed";
import { AZButton } from "../classes/files";

module.exports = <AZButton>{
    name: "radio",
    async execute(interaction: ButtonInteraction) {
        if (!config.grades.includes(interaction.guild.members.cache.get(interaction.user.id).roles.highest.id)) return interaction.deferUpdate();

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