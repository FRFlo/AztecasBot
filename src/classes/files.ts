import { AutocompleteInteraction, ButtonInteraction, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export interface AZCommand {
    data: SlashCommandBuilder;
    private?: boolean;
    autocomplete?(interaction: AutocompleteInteraction);
    execute(interaction: ChatInputCommandInteraction);
};

export interface AZButton {
    name: string;
    execute(interaction: ButtonInteraction);
};

export interface AZEvent {
    name: string;
    once: boolean;
    execute(...args: any[]);
};