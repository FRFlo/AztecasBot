import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { config, db } from "..";
import { Member } from "../classes/database";
import { AZCommand } from "../classes/files";

module.exports = <AZCommand>{
    data: new SlashCommandBuilder()
        .setName("enregistrement")
        .setDescription("S'enregistrer en tant que membre du gang")
        .addStringOption(option => option
            .setName("surnom")
            .setDescription("Votre surnom dans le gang")
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName("numero")
            .setDescription("Votre numéro de téléphone")
            .setRequired(true)
        )
        .addAttachmentOption(option => option
            .setName("carte-identite")
            .setDescription("Votre carte d'identité")
            .setRequired(true)
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        const member = await db.manager.findOne(Member, { where: { id: interaction.user.id } }) ?? new Member();
        member.id = interaction.user.id;
        member.name = interaction.options.getString("surnom", true);
        member.phone = interaction.options.getString("numero", true);
        member.idCard = interaction.options.getAttachment("carte-identite", true)?.url;

        await db.manager.save(member);

        const guildMember = await interaction.guild.members.fetch(interaction.user.id);

        if (![...config.grades, ...config.membres].includes(guildMember.roles.highest.id)) {
            await guildMember.roles.add(config.membres[config.membres.length - 1]);
        }

        await interaction.editReply("Vous êtes désormais enregistré en tant que membre du gang");
    },
};