import { ShardingManager } from 'discord.js';
import config from 'config';

const Manager = new ShardingManager('./lib/client.js', {totalShards: 7, token: config.get('discord').token});
Manager.spawn();