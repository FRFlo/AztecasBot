import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { db } from "..";
import { Member } from "../classes/database";
import { AZCommand } from "../classes/files";

module.exports = <AZCommand>{
    data: new SlashCommandBuilder()
        .setName("enregistrement")
        .setDescription("S'enregistrer en tant que membre du gang")
        .addStringOption(option => option
            .setName("pseudo")
            .setDescription("Votre pseudo dans le gang")
            .setRequired(true)
        )
        .addIntegerOption(option => option
            .setName("numero")
            .setDescription("Votre numéro de téléphone")
            .setRequired(true)
        )
        .addAttachmentOption(option => option
            .setName("carte-identite")
            .setDescription("Votre carte d'identité")
            .setRequired(false)
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        const member = await db.manager.findOne(Member, { where: { id: interaction.user.id } }) ?? new Member();
        member.id = interaction.user.id;
        member.name = interaction.options.getString("pseudo", true);
        member.phone = interaction.options.getInteger("numero", true);
        member.idCard = interaction.options.getAttachment("carte-identite", true).url;

        await db.manager.save(member);

        await interaction.editReply("Vous êtes désormais enregistré en tant que membre du gang");
    },
};