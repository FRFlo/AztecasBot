import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Member } from "../classes/database";
import { AZCommand } from "../classes/files";
import { db, log } from "../index";

module.exports = <AZCommand>{
    data: new SlashCommandBuilder()
        .setName("pseudo")
        .setDescription("La fin des pseudos illisibles"),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        const members = await interaction.guild.members.fetch();

        for (const member of members.values()) {
            if (member.user.bot) continue;

            const dbMember = await db.manager.findOne(Member, { where: { id: member.id } });

            if (!dbMember) continue;

            try {
                await member.setNickname(`El ${dbMember.name}`);
            } catch (error) {
                log(`Impossible de changer le pseudo de ${member.user.tag} (${member.id})`);
            }
        }

        await interaction.editReply("Les pseudos sont désormais dans une police plus lisible.");
    },
};