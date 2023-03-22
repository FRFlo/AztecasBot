import { AutocompleteInteraction, ButtonInteraction, ChatInputCommandInteraction, ContextMenuCommandInteraction } from "discord.js";
import { buttons, commands, menus } from "..";
import { EmbedResponseError } from "../classes/embed";
import { AZEvent } from "../classes/files";

module.exports = <AZEvent>{
    name: 'interactionCreate',
    async execute(interaction: ChatInputCommandInteraction | AutocompleteInteraction | ButtonInteraction | ContextMenuCommandInteraction) {
        if (interaction.isChatInputCommand()) {
            const command = commands.get(interaction.commandName);

            if (!command) {
                (async () => {
                    try {
                        await interaction.reply({
                            embeds: [
                                new EmbedResponseError(interaction.user, {
                                    description: "Cette commande n'existe pas !",
                                })
                            ], ephemeral: true
                        });

                        return interaction.client.application.commands.delete(interaction.commandId);
                    } catch (error) {
                        console.error(error);
                    };
                })();
            };

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    embeds: [
                        new EmbedResponseError(interaction.user, {
                            description: "Une erreur est survenue lors de l'exécution de la commande !",
                        })
                    ], ephemeral: true
                });
            };
        } else if (interaction.isAutocomplete()) {
            const command = commands.get(interaction.commandName);

            if (!command) {
                (async () => {
                    try {
                        return await interaction.respond([
                            {

                                name: "Cette auto-complétion n'existe pas !",
                                value: "error",
                            }
                        ]);
                    } catch (error) {
                        console.error(error);
                    };
                })();
            };

            try {
                await command.autocomplete(interaction);
            } catch (error) {
                console.error(error);
                await interaction.respond([
                    {

                        name: "Une erreur est survenue lors de l'exécution de l'auto-complétion !",
                        value: "error",
                    }
                ]);
            };
        } else if (interaction.isButton()) {
            const button = buttons.get(interaction.customId);

            if (!button) {
                return await interaction.reply({
                    embeds: [
                        new EmbedResponseError(interaction.user, {
                            description: "Ce bouton n'existe pas !",
                        })
                    ], ephemeral: true
                });
            }

            try {
                await button.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    embeds: [
                        new EmbedResponseError(interaction.user, {
                            description: "Une erreur est survenue lors de l'exécution du bouton !",
                        })
                    ], ephemeral: true
                });
            }
        } else if (interaction.isMessageContextMenuCommand() || interaction.isUserContextMenuCommand()) {
            const menu = menus.get(interaction.commandName);

            if (!menu) {
                return await interaction.reply({
                    embeds: [
                        new EmbedResponseError(interaction.user, {
                            description: "Ce menu n'existe pas !",
                        })
                    ], ephemeral: true
                });
            }

            try {
                await menu.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    embeds: [
                        new EmbedResponseError(interaction.user, {
                            description: "Une erreur est survenue lors de l'exécution du menu !",
                        })
                    ], ephemeral: true
                });
            }
        };
    },
};