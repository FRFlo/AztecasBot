import { ApplicationCommandType, ContextMenuCommandBuilder, MessageContextMenuCommandInteraction } from "discord.js";
import { config, db } from "..";
import { Member } from "../classes/database";
import { EmbedResponseSuccess } from "../classes/embed";

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("Contact")
        .setType(ApplicationCommandType.User),
    async execute(interaction: MessageContextMenuCommandInteraction) {
        await interaction.deferReply({ ephemeral: true });

        const member = await db.manager.findOne(Member, { where: { id: interaction.targetId } });

        if (!member) {
            return interaction.editReply({
                content: "Ce membre n'est pas enregistré dans la base de données !",
            });
        };

        const embed = new EmbedResponseSuccess(interaction.user)
            .setTitle("Informations")
            .addFields([
                { name: "Pseudo", value: member.name, inline: true },
                { name: "Numéro de téléphone", value: String(member.phone), inline: true },
            ])

        if (config.grades.includes(interaction.guild.members.cache.get(member.id).roles.highest.id)) embed.setThumbnail(member.idCard);

        return interaction.editReply({
            embeds: [
                embed
            ],
        });
    },
};