import config from 'config';
import Guild from './guild';

export default class Tokenizer {

    static async getPrefix(guildId) {
        let prefix = config.get('discord').prefix;
        let guild = await Guild.getGuildWithId(guildId);
        if (guild && guild.prefix) prefix = guild.prefix;
        return prefix;
    }

    static async getTokens(message) {
        let guildId = message.channel.id;
        if (message.guild) guildId = message.guild.id;
        let prefix = await this.getPrefix(guildId);
        if (!message.content.startsWith(prefix)) return;
        let content = message.content.slice(prefix.length);
        return content.split(' ');
    }

}