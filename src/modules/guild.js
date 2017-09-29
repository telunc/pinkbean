import rp from 'request-promise';
import config from 'config';
import redis from './redis';
import { Guild } from './database';

export default class {
    static async getGuilds() {
        let cache = await redis.getAsync('guilds');
        if (cache) return JSON.parse(cache);
        let guilds = await rp({ uri: `${config.get('server')}/api/guild/`, json: true }).catch(() => {
            // console.error('failed to load guilds');
        });
        if (!guilds) return;
        await redis.set('guilds', JSON.stringify(guilds), 'EX', 86400);
        return guilds;
    }
    static async getGuildWithId(id) {
        let cache = await redis.getAsync(`guild-${id}`);
        if (cache) return JSON.parse(cache);
        let guild = await rp({ uri: `${config.get('server')}/api/guild/${id}`, json: true }).catch(() => {
            // console.error(`failed to load guild with id ${id}`);
        });
        if (!guild) return;
        await redis.set(`guild-${id}`, JSON.stringify(guild), 'EX', 86400);
        return guild;
    }
    static async updateGuildWithId(id, post) {
        let guild = await Guild.update(post, { where: { id: id } }).catch((error) => {
            console.error(error);
        });
        redis.del(`guild-${id}`);
        return guild;
    }

    static async deleteGuildWithId(id) {
        let guild = await Guild.destroy({ where: { id: id } }).catch((error) => {
            console.error(error);
        });
        redis.del(`guild-${id}`);
        return guild;
    }

    static async setGuild(post) {
        return Guild.create(post);
    }
}