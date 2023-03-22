import { AutocompleteInteraction, ButtonInteraction, ChatInputCommandInteraction, ContextMenuCommandBuilder, ContextMenuCommandInteraction, SlashCommandBuilder } from "discord.js";

export interface AZCommand {
    data: SlashCommandBuilder;
    autocomplete?(interaction: AutocompleteInteraction);
    execute(interaction: ChatInputCommandInteraction);
};

export interface AZButton {
    name: string;
    execute(interaction: ButtonInteraction);
};

export interface AZMenu {
    data: ContextMenuCommandBuilder;
    execute(interaction: ContextMenuCommandInteraction);
}

export interface AZEvent {
    name: string;
    once: boolean;
    execute(...args: any[]);
};