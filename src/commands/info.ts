import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { EmbedResponseSuccess } from "../classes/embed";
import { AZCommand } from "../classes/files";
import { commands } from "../index";

module.exports = <AZCommand>{
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Affiche des informations sur le bot"),
    async execute(interaction: ChatInputCommandInteraction) {
        const uptime = interaction.client.uptime;

        const uptimeString =
            (Math.floor(uptime / 86400000) ? String(Math.floor(uptime / 86400000)) + " jours, " : "") +
            (Math.floor(uptime / 3600000) % 24 ? String(Math.floor(uptime / 3600000) % 24) + " heures, " : "") +
            (Math.floor(uptime / 60000) % 60 ? String(Math.floor(uptime / 60000) % 60) + " minutes, " : "") +
            (Math.floor(uptime / 1000) % 60 ? String(Math.floor(uptime / 1000) % 60) + " secondes, " : "") +
            (Math.floor(uptime) % 1000 ? String(Math.floor(uptime) % 1000) + " milisecondes, " : "");

        await interaction.reply({
            embeds: [
                new EmbedResponseSuccess(interaction.user)
                    .setTitle("Informations")
                    .addFields(
                        { name: "Uptime", value: uptimeString, inline: true },
                        { name: "Serveurs", value: String(interaction.client.guilds.cache.size), inline: true },
                        { name: "Salons", value: String(interaction.client.channels.cache.size), inline: true },
                        { name: "Utilisateurs", value: String(interaction.client.users.cache.size), inline: true },
                        { name: "Commandes", value: String(commands.size), inline: true },
                    )
            ],
        });
    },
};