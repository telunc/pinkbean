import redis from 'redis';
import bluebird from 'bluebird';
import config from 'config';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let redisClient = redis.createClient(config.get('redis'));

export default redisClient;