import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { AZCommand } from "../classes/files";
import { log } from "..";

module.exports = <AZCommand>{
    data: new SlashCommandBuilder()
        .setName("permission")
        .setDescription("La fin des permissions absurdes")
        .addRoleOption(option => option.setName("role")
            .setDescription("Le rôle à enlever")
            .setRequired(true)
        )
        .addRoleOption(option => option.setName("whitelist")
            .setDescription("Le rôle à partir duquel les permissions sont autorisées")
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        const members = await interaction.guild.members.fetch();

        for (const member of members.values()) {
            if (member.user.bot) continue;

            if (interaction.options.getRole("whitelist") && member.roles.highest.comparePositionTo(interaction.guild.roles.resolve(interaction.options.getRole("whitelist").id)) < 0) continue;

            if (interaction.user.id === member.id) continue;

            try {
                await member.roles.remove(interaction.options.getRole("role").id);
            } catch (error) {
                log(`Impossible de retirer le rôle ${interaction.options.getRole("role").name} à ${member.user.tag} (${member.id})`);
            }
        }

        await interaction.editReply(`Tous les membres ont été débarrassés du rôle \`\`${interaction.options.getRole("role").name}\`\``);
    },
};