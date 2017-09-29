import redis from './redis';
import { Guild } from './database';

export default class {
    static async getGuilds() {
        let guilds = await Guild.findAll().catch((error) => {
            console.error(error);
        });
        if (!guilds) return;
        return guilds;
    }
    static async getGuildWithId(id) {
        let cache = await redis.getAsync(`guild-${id}`);
        if (cache) return JSON.parse(cache);
        let guild = await Guild.findOne({ where: { id: id } }).catch((error) => {
            console.error(error);
        });
        if (!guild) return;
        guild = guild.toJSON();
        await redis.set(`guild-${id}`, JSON.stringify(guild), 'EX', 86400);
        return guild;
    }
    static async updateGuildWithId(id, post) {
        let guild = await Guild.update(post, { where: { id: id } }).catch((error) => {
            console.error(error);
        });
        await redis.delAsync(`guild-${id}`).catch((error) => {
            console.error(error);
        });
        return guild;
    }

    static async deleteGuildWithId(id) {
        let guild = await Guild.destroy({ where: { id: id } }).catch((error) => {
            console.error(error);
        });
        await redis.delAsync(`guild-${id}`).catch((error) => {
            console.error(error);
        });
        return guild;
    }

    static async setGuild(post) {
        return Guild.create(post);
    }
}