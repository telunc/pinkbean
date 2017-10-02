import ping from './commands/ping';
import rank from './commands/rank';
import rankjw from './commands/rank-jw';
import rankja from './commands/rank-ja';
import mob from './commands/mob';
import item from './commands/item';
import sub from './commands/sub';
import timer from './commands/timer';
import help from './commands/help';
import avatar from './commands/avatar';
import about from './commands/about';
import prefix from './commands/prefix';
import news from './commands/news';
import time from './commands/time';
import daily from './commands/daily';
import weekly from './commands/weekly';

export default {
    'help': (tokens, message) => {
        return help(message);
    },
    'ping': (tokens, message) => {
        return ping(message);
    },
    'rank': (tokens, message) => {
        return rank(tokens, message, 'na');
    },
    'rank-jw': (tokens, message) => {
        return rankjw(tokens, message, 'na');
    },
    'rank-ja': (tokens, message) => {
        return rankja(tokens, message, 'na');
    },
    'rankeu': (tokens, message) => {
        return rank(tokens, message, 'eu');
    },
    'rankeu-jw': (tokens, message) => {
        return rankjw(tokens, message, 'eu');
    },
    'rankeu-ja': (tokens, message) => {
        return rankja(tokens, message, 'eu');
    },
    'mob': (tokens, message) => {
        return mob(tokens, message);
    },
    'item': (tokens, message) => {
        return item(tokens, message);
    },
    'sub': (tokens, message) => {
        return sub(message);
    },
    'timer': (tokens, message) => {
        return timer(message);
    },
    'avatar': (tokens, message) => {
        return avatar(tokens, message);
    },
    'about': (tokens, message, client) => {
        return about(message, client);
    },
    'prefix': (tokens, message) => {
        return prefix(tokens, message);
    },
    'news': (tokens, message) => {
        return news(tokens, message);
    },
    'time': (tokens, message) => {
        return time(message);
    },
    'daily': (tokens, message) => {
        return daily(message);
    },
    'weekly': (tokens, message) => {
        return weekly(message);
    }
};