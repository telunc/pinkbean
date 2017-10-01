import ping from './commands/ping';
import rank from './commands/rank';
import rankjw from './commands/rank-jw';
import rankja from './commands/rank-ja';
import rankeu from './commands/rankeu';
import rankeujw from './commands/rankeu-jw';
import rankeuja from './commands/rankeu-ja';
import mob from './commands/mob';
import item from './commands/item';
import sub from './commands/sub';
import timer from './commands/timer';
import help from './commands/help';
import avatar from './commands/avatar';
import about from './commands/about';
import prefix from './commands/prefix';
import news from './commands/news';

export default {
    'help': (tokens, message) => {
        return help(message);
    },
    'ping': (tokens, message) => {
        return ping(message);
    },
    'rank': (tokens, message) => {
        return rank(tokens, message);
    },
    'rank-jw': (tokens, message) => {
        return rankjw(tokens, message);
    },
    'rank-ja': (tokens, message) => {
        return rankja(tokens, message);
    },
    'rankeu': (tokens, message) => {
        return rankeu(tokens, message);
    },
    'rankeu-jw': (tokens, message) => {
        return rankeujw(tokens, message);
    },
    'rankeu-ja': (tokens, message) => {
        return rankeuja(tokens, message);
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
    }
};