import { Client, GatewayIntentBits } from "discord.js";
import { readdirSync } from "fs";
import "reflect-metadata";
import { DataSource } from "typeorm";
import * as config from "../configs/config.json";
import { Member } from "./classes/database";
import { AZButton, AZCommand, AZEvent } from "./classes/files";

const client = new Client<true>({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
    ],
});
let db: DataSource;
(async () => {
    db = await new DataSource({
        type: "mariadb",
        host: config.database.host,
        port: config.database.port,
        username: config.database.user,
        password: config.database.password,
        database: config.database.database,
        synchronize: true,
        logging: false,
        entities: [Member],
        migrations: [],
        subscribers: [],
        charset: "utf8mb4_general_ci",
    }).initialize()
})();
const cmdlists = [];
const commands = new Map<string, AZCommand>();
const buttons = new Map<string, AZButton>();
const events = new Map<string, AZEvent>();

function log(...args: any[]) { console.log(`[${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}] - `, ...args) };

for (const file of readdirSync(`${__dirname}/commands`).filter(file => file.endsWith(".ts"))) {
    const command: AZCommand = require(`${__dirname}/commands/${file}`)
    commands.set(command.data.name, command);
    cmdlists.push(command.data.toJSON());
}

for (const file of readdirSync(`${__dirname}/buttons`).filter(file => file.endsWith(".ts"))) {
    const button: AZButton = require(`${__dirname}/buttons/${file}`)
    buttons.set(button.name, button);
}

for (const file of readdirSync(`${__dirname}/events`).filter(file => file.endsWith(".ts"))) {
    const event: AZEvent = require(`${__dirname}/events/${file}`)
    events.set(event.name, event);
    if (event.once) {
        client.once(event.name, async (...args) => event.execute(...args));
    } else {
        client.on(event.name, async (...args) => event.execute(...args));
    }
}
(async () => {
    await client.login(config.token);

    client.application.commands.set(cmdlists);
})();

export { buttons, client, commands, config, db, events, log };

