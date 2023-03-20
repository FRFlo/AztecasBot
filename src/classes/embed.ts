import { APIEmbed, EmbedBuilder, EmbedData, User } from 'discord.js';
import { client } from '..';

export class Embed extends EmbedBuilder {
    constructor(data?: APIEmbed | EmbedData) {
        super(data);
        this.setFooter({
            text: client.user?.username,
            iconURL: client.user?.displayAvatarURL()
        });
        this.setColor("#23262E");
        this.setTimestamp();
    };
};

export class EmbedResponse extends Embed {
    constructor(user: User, data?: APIEmbed | EmbedData) {
        super(data);
        this.setFooter({
            text: `Initié par ${user.username}`,
            iconURL: user.displayAvatarURL()
        });
    };
};

export class EmbedResponseError extends EmbedResponse {
    constructor(user: User, data?: APIEmbed | EmbedData) {
        super(user, data);
        this.setColor("#FF0000");
    };
};

export class EmbedResponseSuccess extends EmbedResponse {
    constructor(user: User, data?: APIEmbed | EmbedData) {
        super(user, data);
        this.setColor("#00FF00");
    };
};